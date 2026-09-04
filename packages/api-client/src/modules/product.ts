import type {
  FavoriteParams,
  FavoriteResult,
  PaginationParams,
  PaginationResponse,
  ProductItem,
} from '../types';

import { httpClient } from '../singleton';

export const getProductList = (params: PaginationParams = {}) =>
  httpClient.get<PaginationResponse<ProductItem>>('/product/list', { params });

export const getProductDetail = (id: number | string) =>
  httpClient.get<ProductItem>('/product/detail', { params: { id } });

export const toggleProductFavorite = (params: FavoriteParams) =>
  httpClient.post<FavoriteResult, FavoriteParams>('/product/favorite', params);
