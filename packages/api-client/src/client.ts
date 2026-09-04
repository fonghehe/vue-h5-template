import type {
  AxiosAdapter,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

import type { ApiResponse } from './types';

import axios, { AxiosError, AxiosHeaders } from 'axios';

import { ApiError } from './types';

export interface ApiClientOptions {
  /** Test or platform-specific transport adapter. */
  adapter?: AxiosAdapter;
  baseURL?: string;
  generateRequestId?: boolean;
  getAccessToken?: () => null | string | undefined;
  /** Current UI language; evaluated for each request. */
  getLocale?: () => string;
  onUnauthorized?: (error: ApiError) => Promise<void> | void;
  timeout?: number;
}

export interface ApiClient {
  configure(options: Partial<ApiClientOptions>): void;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig<TBody>,
  ): Promise<T>;
  post<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig<TBody>,
  ): Promise<T>;
  put<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig<TBody>,
  ): Promise<T>;
}

function createRequestId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `vh5-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  );
}

function assertRelativeEndpoint(url?: string): void {
  if (url && /^(?:[a-z][a-z\d+.-]*:|\/\/)/iu.test(url)) {
    throw new ApiError(
      'API endpoint must be relative to the configured base URL',
      { kind: 'configuration' },
    );
  }
}

function isApiResponse(value: unknown): value is ApiResponse<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'data' in value &&
    'message' in value
  );
}

function requestIdFrom(config?: AxiosRequestConfig) {
  const headers = config?.headers;
  if (!headers) return undefined;
  const value =
    headers instanceof AxiosHeaders
      ? headers.get('X-Request-ID')
      : Object.entries(headers).find(
          ([name]) => name.toLowerCase() === 'x-request-id',
        )?.[1];
  return typeof value === 'string' ? value : undefined;
}

function normalizeAxiosError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (!axios.isAxiosError(error)) {
    return new ApiError('An unexpected request error occurred', {
      cause: error,
      kind: 'unknown',
    });
  }

  const axiosError = error as AxiosError<ApiResponse<unknown>>;
  const status = axiosError.response?.status;
  const requestId = requestIdFrom(axiosError.config);
  if (
    axiosError.code === AxiosError.ETIMEDOUT ||
    axiosError.code === AxiosError.ECONNABORTED
  ) {
    return new ApiError('Request timed out. Please try again.', {
      cause: error,
      code: axiosError.code,
      kind: 'timeout',
      requestId,
      status,
    });
  }
  if (!axiosError.response) {
    return new ApiError('Network unavailable. Check your connection.', {
      cause: error,
      code: axiosError.code,
      kind: 'network',
      requestId,
    });
  }

  const message =
    axiosError.response.data?.message || axiosError.message || 'Request failed';
  return new ApiError(message, {
    cause: error,
    code: axiosError.code,
    kind: status === 401 ? 'unauthorized' : 'http',
    requestId,
    status,
  });
}

export function createApiClient(
  initialOptions: ApiClientOptions = {},
): ApiClient {
  let options: ApiClientOptions = {
    baseURL: '/api',
    generateRequestId: true,
    timeout: 15_000,
    ...initialOptions,
  };
  const instance: AxiosInstance = axios.create({
    adapter: options.adapter,
    baseURL: options.baseURL,
    timeout: options.timeout,
    withCredentials: true,
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    assertRelativeEndpoint(config.url);
    const token = options.getAccessToken?.();
    if (token) config.headers.set('Authorization', `Bearer ${token}`);
    const locale = options.getLocale?.();
    if (locale && !config.headers.has('Accept-Language')) {
      config.headers.set('Accept-Language', locale);
    }
    if (options.generateRequestId && !config.headers.has('X-Request-ID')) {
      config.headers.set('X-Request-ID', createRequestId());
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      if (isApiResponse(response.data) && response.data.code !== 0) {
        return Promise.reject(
          new ApiError(response.data.message || 'Business request failed', {
            code: response.data.code,
            kind: 'business',
            requestId: requestIdFrom(response.config),
            status: response.status,
          }),
        );
      }
      return response;
    },
    async (error: unknown) => {
      const normalized = normalizeAxiosError(error);
      if (normalized.kind === 'unauthorized') {
        await options.onUnauthorized?.(normalized);
      }
      throw normalized;
    },
  );

  async function request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await instance.request<ApiResponse<T>>(config);
    return response.data.data;
  }

  return {
    configure(nextOptions) {
      options = { ...options, ...nextOptions };
      instance.defaults.baseURL = options.baseURL;
      instance.defaults.timeout = options.timeout;
    },
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'DELETE', url }),
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'GET', url }),
    patch: <T, TBody = unknown>(
      url: string,
      data?: TBody,
      config?: AxiosRequestConfig<TBody>,
    ) => request<T>({ ...config, data, method: 'PATCH', url }),
    post: <T, TBody = unknown>(
      url: string,
      data?: TBody,
      config?: AxiosRequestConfig<TBody>,
    ) => request<T>({ ...config, data, method: 'POST', url }),
    put: <T, TBody = unknown>(
      url: string,
      data?: TBody,
      config?: AxiosRequestConfig<TBody>,
    ) => request<T>({ ...config, data, method: 'PUT', url }),
  };
}
