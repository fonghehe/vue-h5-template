import type { PaginationResponse, ProductItem } from '@vh5/api-client';

import { enableAutoUnmount, mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';

import { getProductList } from '@vh5/api-client';

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useInfiniteProducts, useProductPage } from '../queries';

vi.mock('@vh5/api-client', () => ({ getProductList: vi.fn() }));
vi.mock('@vh5/locales', () => ({ useI18n: () => ({ locale }) }));

const locale = ref('en-US');
const clients: QueryClient[] = [];
beforeEach(() => {
  locale.value = 'en-US';
  vi.mocked(getProductList).mockReset();
});
enableAutoUnmount(afterEach);
afterEach(() => {
  for (const client of clients.splice(0)) client.clear();
});

function harness<T>(setup: () => T) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  clients.push(client);
  let query!: T;
  mount(
    defineComponent({
      setup() {
        query = setup();
        return () => h('div');
      },
    }),
    {
      global: { plugins: [[VueQueryPlugin, { queryClient: client }]] },
    },
  );
  return { client, query };
}

function result(
  page: number,
  hasMore = false,
): PaginationResponse<ProductItem> {
  return { hasMore, items: [], page, pageSize: 4, total: 8 };
}

describe('product query state', () => {
  it('caches pages separately and refetches after a locale change', async () => {
    vi.mocked(getProductList).mockImplementation(async ({ page } = {}) =>
      result(page ?? 1),
    );
    const page = ref(1);
    const { client, query } = harness(() => useProductPage(page));
    await vi.waitFor(() => expect(query.isSuccess.value).toBe(true));
    expect(getProductList).toHaveBeenLastCalledWith({ page: 1, pageSize: 4 });
    page.value = 2;
    await vi.waitFor(() => expect(query.data.value?.page).toBe(2));
    page.value = 1;
    await vi.waitFor(() => expect(query.data.value?.page).toBe(1));
    expect(getProductList).toHaveBeenCalledTimes(2);
    locale.value = 'ja-JP';
    await vi.waitFor(() => expect(getProductList).toHaveBeenCalledTimes(3));
    expect(client.getQueryData(['products', 'page', 1, 4, 'en-US'])).toEqual(
      result(1),
    );
    await vi.waitFor(() =>
      expect(client.getQueryData(['products', 'page', 1, 4, 'ja-JP'])).toEqual(
        result(1),
      ),
    );
  });

  it('keeps previous page data while the next page is loading', async () => {
    const pending = Promise.withResolvers<PaginationResponse<ProductItem>>();
    vi.mocked(getProductList)
      .mockResolvedValueOnce(result(1, true))
      .mockReturnValueOnce(pending.promise);
    const page = ref(1);
    const { query } = harness(() => useProductPage(page));
    await vi.waitFor(() => expect(query.isSuccess.value).toBe(true));
    page.value = 2;
    await vi.waitFor(() => expect(query.isPlaceholderData.value).toBe(true));
    expect(query.data.value?.page).toBe(1);
    pending.resolve(result(2));
    await vi.waitFor(() => expect(query.data.value?.page).toBe(2));
    expect(query.isPlaceholderData.value).toBe(false);
  });

  it('stops infinite pagination at hasMore=false and isolates a new locale', async () => {
    vi.mocked(getProductList).mockImplementation(async ({ page } = {}) =>
      result(page ?? 1, page === 1),
    );
    const { query } = harness(() => useInfiniteProducts());
    await vi.waitFor(() => expect(query.hasNextPage.value).toBe(true));
    await query.fetchNextPage();
    expect(query.data.value?.pages.map(({ page }) => page)).toEqual([1, 2]);
    expect(query.hasNextPage.value).toBe(false);
    await query.fetchNextPage();
    expect(getProductList).toHaveBeenCalledTimes(2);
    locale.value = 'zh-CN';
    await vi.waitFor(() => expect(getProductList).toHaveBeenCalledTimes(3));
    await vi.waitFor(() => expect(query.data.value?.pages).toHaveLength(1));
  });

  it('exposes a failed request and recovers on manual refetch', async () => {
    const failure = new Error('offline');
    vi.mocked(getProductList)
      .mockRejectedValueOnce(failure)
      .mockResolvedValueOnce(result(1));
    const { query } = harness(() => useProductPage(ref(1)));
    await vi.waitFor(() => expect(query.isError.value).toBe(true));
    expect(query.error.value).toBe(failure);
    await query.refetch();
    expect(query.isSuccess.value).toBe(true);
    expect(query.error.value).toBeNull();
  });
});
