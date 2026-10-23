import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';

import {
  getProductFavorite,
  getProductList,
  setProductFavorite,
} from '@vh5/api-client';

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import QueryPage from '../QueryPage.vue';

vi.mock('@vh5/api-client', () => ({
  getErrorMessage: () => 'Request failed',
  getProductList: vi.fn(),
  getProductFavorite: vi.fn(),
  setProductFavorite: vi.fn(),
}));
vi.mock('@vh5/locales', () => ({
  useI18n: () => ({ t: (key: string) => key, locale: ref('en-US') }),
}));
const clients: QueryClient[] = [];
enableAutoUnmount(afterEach);
beforeEach(() => {
  vi.mocked(getProductList)
    .mockReset()
    .mockResolvedValue({
      items: [
        {
          id: 1,
          title: 'Everyday bag',
          price: '12.50',
          vipPrice: '11.00',
          imgUrl: '',
          shopName: 'Shop',
          shopDesc: 'Official',
          delivery: 'Available',
          description: 'Useful bag',
        },
      ],
      page: 1,
      pageSize: 4,
      total: 1,
      hasMore: false,
    });
  vi.mocked(getProductFavorite)
    .mockReset()
    .mockResolvedValue({ productId: 1, favorite: true });
  vi.mocked(setProductFavorite).mockReset();
});
afterEach(() => clients.splice(0).forEach((client) => client.clear()));
function render(session = 'account-a') {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  clients.push(client);
  return mount(QueryPage, {
    props: { session },
    global: {
      plugins: [[VueQueryPlugin, { queryClient: client }]],
      stubs: { RouterLink: { template: '<a><slot></slot></a>' } },
    },
  });
}
describe('query example favorites', () => {
  it('reads the saved state before allowing the user to remove a favorite', async () => {
    const wrapper = render();
    await vi.waitFor(() =>
      expect(wrapper.find('.row-link [aria-pressed="true"]').exists()).toBe(
        true,
      ),
    );
    vi.mocked(setProductFavorite).mockResolvedValueOnce({
      productId: 1,
      favorite: false,
    });
    await wrapper.get('.row-link [aria-pressed="true"]').trigger('click');
    await vi.waitFor(() =>
      expect(wrapper.find('.row-link [aria-pressed="false"]').exists()).toBe(
        true,
      ),
    );
    expect(setProductFavorite).toHaveBeenCalledWith(1, false);
  });
  it('offers sign-in instead of a private mutation to guests', async () => {
    const wrapper = render('');
    await flushPromises();
    await vi.waitFor(() =>
      expect(wrapper.text()).toContain('mobile.favoriteLogin'),
    );
    expect(getProductFavorite).not.toHaveBeenCalled();
  });
  it('keeps an old mutation out of the next account and reloads saved state', async () => {
    const old = Promise.withResolvers<{
      favorite: boolean;
      productId: number;
    }>();
    const wrapper = render();
    await vi.waitFor(() =>
      expect(wrapper.find('.row-link [aria-pressed="true"]').exists()).toBe(
        true,
      ),
    );
    vi.mocked(setProductFavorite).mockReturnValueOnce(old.promise);
    await wrapper.get('.row-link [aria-pressed="true"]').trigger('click');
    vi.mocked(getProductFavorite).mockResolvedValueOnce({
      productId: 1,
      favorite: true,
    });
    await wrapper.setProps({ session: 'account-b' });
    old.resolve({ productId: 1, favorite: false });
    await flushPromises();
    await vi.waitFor(() =>
      expect(wrapper.find('.row-link [aria-pressed="true"]').exists()).toBe(
        true,
      ),
    );
    expect(getProductFavorite).toHaveBeenCalledTimes(2);
  });
});
