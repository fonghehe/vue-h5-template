import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { AxiosError, AxiosHeaders } from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { createApiClient } from '../client';
import { ApiError } from '../types';

function response(
  config: InternalAxiosRequestConfig,
  data: unknown,
  status = 200,
): AxiosResponse {
  return {
    config,
    data,
    headers: new AxiosHeaders(),
    status,
    statusText: status === 200 ? 'OK' : 'Error',
  };
}

describe('createApiClient', () => {
  it.each([AxiosError.ETIMEDOUT, AxiosError.ECONNABORTED])(
    'normalizes timeout %s and retains the request ID',
    async (code) => {
      const adapter: AxiosAdapter = async (config) => {
        throw new AxiosError('timeout', code, config);
      };
      const client = createApiClient({ adapter });
      await expect(
        client.get('/slow', { headers: { 'X-Request-ID': 'trace-1' } }),
      ).rejects.toMatchObject({
        code,
        kind: 'timeout',
        requestId: 'trace-1',
      });
    },
  );

  it('normalizes network, HTTP and unexpected transport errors', async () => {
    const onUnauthorized = vi.fn();
    const failures: [Error, Partial<ApiError>][] = [
      [new AxiosError('offline', AxiosError.ERR_NETWORK), { kind: 'network' }],
      [new Error('unexpected'), { kind: 'unknown' }],
    ];
    for (const [failure, expected] of failures) {
      const client = createApiClient({
        adapter: vi.fn<AxiosAdapter>().mockRejectedValue(failure),
        onUnauthorized,
      });
      await expect(client.get('/resource')).rejects.toMatchObject(expected);
    }
    const client = createApiClient({
      adapter: async (config) => {
        throw new AxiosError(
          'Bad response',
          AxiosError.ERR_BAD_RESPONSE,
          config,
          undefined,
          response(config, { message: 'Service unavailable' }, 503),
        );
      },
      onUnauthorized,
    });
    await expect(client.get('/resource')).rejects.toMatchObject({
      kind: 'http',
      status: 503,
      message: 'Service unavailable',
    });
    expect(onUnauthorized).not.toHaveBeenCalled();
  });

  it('applies reconfiguration and never retains a previous session token', async () => {
    let token: string | undefined = 'signed-in';
    const adapter = vi.fn<AxiosAdapter>(async (config) =>
      response(config, { code: 0, data: null, message: 'ok' }),
    );
    const client = createApiClient({
      adapter,
      getAccessToken: () => token,
      generateRequestId: false,
    });
    await client.get('/user/info');
    token = undefined;
    client.configure({ baseURL: '/gateway', timeout: 500 });
    await client.get('/user/info');
    expect(adapter.mock.calls[0]?.[0].headers.get('Authorization')).toBe(
      'Bearer signed-in',
    );
    const second = adapter.mock.calls[1]?.[0];
    expect(second?.headers.has('Authorization')).toBe(false);
    expect(second?.headers.has('X-Request-ID')).toBe(false);
    expect(second?.baseURL).toBe('/gateway');
    expect(second?.timeout).toBe(500);
  });

  it('supports typed write methods and delete without losing their payloads', async () => {
    const adapter = vi.fn<AxiosAdapter>(async (config) =>
      response(config, { code: 0, data: { updated: true }, message: 'ok' }),
    );
    const client = createApiClient({ adapter });
    for (const method of ['post', 'put', 'patch'] as const) {
      await expect(
        client[method]('/resource', { title: 'Updated' }),
      ).resolves.toEqual({ updated: true });
    }
    await client.delete('/resource');
    expect(adapter.mock.calls.map(([config]) => config.method)).toEqual([
      'post',
      'put',
      'patch',
      'delete',
    ]);
    expect(
      adapter.mock.calls
        .slice(0, 3)
        .every(
          ([config]) => config.data === JSON.stringify({ title: 'Updated' }),
        ),
    ).toBe(true);
    expect(adapter.mock.calls[3]?.[0].data).toBeUndefined();
  });

  it('reads the current language on each request and respects an explicit override', async () => {
    let locale = 'en-US';
    const adapter = vi.fn<AxiosAdapter>(async (config) =>
      response(config, { code: 0, data: [], message: 'ok' }),
    );
    const client = createApiClient({ adapter, getLocale: () => locale });
    await client.get('/product/list');
    locale = 'ja-JP';
    await client.get('/product/list');
    await client.get('/product/list', {
      headers: { 'Accept-Language': 'zh-CN' },
    });
    expect(
      adapter.mock.calls.map(([config]) =>
        config.headers.get('Accept-Language'),
      ),
    ).toEqual(['en-US', 'ja-JP', 'zh-CN']);
  });
  it('adds auth/request id headers and unwraps ApiResponse data', async () => {
    const adapter = vi.fn<AxiosAdapter>(async (config) =>
      response(config, { code: 0, data: { id: 7 }, message: 'ok' }),
    );
    const client = createApiClient({ adapter, getAccessToken: () => 'token' });

    await expect(client.get<{ id: number }>('/user/info')).resolves.toEqual({
      id: 7,
    });
    const config = adapter.mock.calls[0]?.[0];
    expect(config?.headers.get('Authorization')).toBe('Bearer token');
    expect(config?.headers.get('X-Request-ID')).toMatch(
      /^vh5-|^[\da-f-]{36}$/u,
    );
  });

  it('turns business failures into typed ApiError', async () => {
    const adapter: AxiosAdapter = async (config) =>
      response(config, { code: 42, data: null, message: 'Not allowed' });
    const client = createApiClient({ adapter });

    await expect(client.get('/private')).rejects.toMatchObject({
      code: 42,
      kind: 'business',
      message: 'Not allowed',
    } satisfies Partial<ApiError>);
  });

  it('normalizes 401 and invokes the unauthorized callback', async () => {
    const onUnauthorized = vi.fn();
    const adapter: AxiosAdapter = async (config) => {
      throw new AxiosError(
        'Unauthorized',
        AxiosError.ERR_BAD_REQUEST,
        config,
        undefined,
        response(config, { code: 401, data: null, message: 'Expired' }, 401),
      );
    };
    const client = createApiClient({ adapter, onUnauthorized });

    await expect(client.get('/private')).rejects.toMatchObject({
      kind: 'unauthorized',
      status: 401,
    });
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });

  it('rejects absolute endpoint URLs before credentials reach the adapter', async () => {
    const adapter = vi.fn<AxiosAdapter>();
    const client = createApiClient({
      adapter,
      baseURL: 'https://api.example.com',
      getAccessToken: () => 'sensitive-token',
    });

    await expect(
      client.get('https://untrusted.example/data'),
    ).rejects.toMatchObject({
      kind: 'configuration',
    } satisfies Partial<ApiError>);
    expect(adapter).not.toHaveBeenCalled();
  });
});
