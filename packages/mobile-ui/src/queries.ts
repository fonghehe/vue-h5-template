import type { Ref } from 'vue';

import type { PaginationResponse, ProductItem } from '@vh5/api-client';

import { getProductList } from '@vh5/api-client';
import { useI18n } from '@vh5/locales';

import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/vue-query';

export function useProductPage(page: Ref<number>, pageSize = 4) {
  const { locale } = useI18n();
  return useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => getProductList({ page: page.value, pageSize }),
    queryKey: ['products', 'page', page, pageSize, locale],
  });
}

export function useInfiniteProducts(pageSize = 4) {
  const { locale } = useI18n();
  return useInfiniteQuery({
    getNextPageParam: (lastPage: PaginationResponse<ProductItem>) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getProductList({ page: pageParam, pageSize }),
    queryKey: ['products', 'infinite', pageSize, locale],
  });
}
