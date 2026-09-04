import type { components } from './generated/schema';

export type LoginParams = components['schemas']['LoginRequest'];
export type LoginResult = components['schemas']['LoginResult'];
export type UserInfo = components['schemas']['User'];
export type ProductItem = components['schemas']['Product'];
export type FavoriteParams = components['schemas']['FavoriteRequest'];
export type FavoriteResult = components['schemas']['FavoriteResult'];

export interface ApiResponse<T> {
  code: number;
  data: T;
  error?: null | Record<string, unknown> | string;
  message: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginationResponse<T> {
  hasMore: boolean;
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export type ApiErrorKind =
  | 'business'
  | 'configuration'
  | 'http'
  | 'network'
  | 'timeout'
  | 'unauthorized'
  | 'unknown';

interface ApiErrorOptions {
  cause?: unknown;
  code?: number | string;
  kind: ApiErrorKind;
  requestId?: string;
  status?: number;
}

export class ApiError extends Error {
  readonly code?: number | string;
  readonly kind: ApiErrorKind;
  readonly requestId?: string;
  readonly status?: number;

  constructor(message: string, options: ApiErrorOptions) {
    super(message, { cause: options.cause });
    this.name = 'ApiError';
    this.code = options.code;
    this.kind = options.kind;
    this.requestId = options.requestId;
    this.status = options.status;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown, fallback = 'Request failed') {
  return isApiError(error) ? error.message : fallback;
}
