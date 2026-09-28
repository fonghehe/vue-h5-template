import type {
  FavoriteParams,
  FavoriteResult,
  PaginationParams,
  PaginationResponse,
  ProductItem,
} from '../types';

import { httpClient } from '../singleton';

export const getProductList = (
  params: PaginationParams = {},
  signal?: AbortSignal,
) =>
  httpClient.get<PaginationResponse<ProductItem>>('/product/list', {
    params,
    signal,
  });

export const getProductDetail = (id: number | string, signal?: AbortSignal) =>
  httpClient.get<ProductItem>('/product/detail', { params: { id }, signal });

export const toggleProductFavorite = (params: FavoriteParams) =>
  httpClient.post<FavoriteResult, FavoriteParams>('/product/favorite', params);

export const getProductFavorite = (id: number, signal?: AbortSignal) =>
  httpClient.get<FavoriteResult>('/product/favorite', {
    params: { id },
    signal,
  });
export const setProductFavorite = (productId: number, favorite: boolean) =>
  toggleProductFavorite({ productId, favorite });
