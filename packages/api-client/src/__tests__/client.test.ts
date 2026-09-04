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
