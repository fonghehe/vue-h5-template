import type { ProductItem } from '@vh5/api-client';

import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import { getProductDetail } from '@vh5/api-client';
import { i18n, setupI18n } from '@vh5/locales';

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCartStore } from '../cart';
import DetailsPage from '../DetailsPage.vue';

vi.mock('@vh5/api-client', () => ({
  getProductDetail: vi.fn(),
  getErrorMessage: () => 'Unable to load product',
}));
const product: ProductItem = {
  id: 1,
  title: 'Everyday bag',
  price: '12.50',
  vipPrice: '11.00',
  imgUrl: 'https://example.com/bag.webp',
  shopName: 'Template shop',
  shopDesc: 'Official',
  description: 'A useful bag',
  delivery: 'Delivery available',
};
const clients: QueryClient[] = [];
enableAutoUnmount(afterEach);
beforeEach(async () => {
  localStorage.clear();
  await setupI18n(createApp({}));
  vi.mocked(getProductDetail)
    .mockReset()
    .mockImplementation(async (id) => ({
      ...product,
      id: Number(id),
      title: `Product ${id}`,
    }));
});
afterEach(() => clients.splice(0).forEach((client) => client.clear()));
async function render(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/details', component: DetailsPage },
      { path: '/list', component: { template: '<div>Products</div>' } },
    ],
  });
  await router.push(path);
  const pinia = createPinia();
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  clients.push(client);
  const wrapper = mount(DetailsPage, {
    global: {
      plugins: [router, pinia, i18n, [VueQueryPlugin, { queryClient: client }]],
      stubs: { FavoriteButton: true },
    },
  });
  return { wrapper, router, cart: useCartStore(pinia) };
}

describe('product detail route state', () => {
  it.each([
    '',
    '?id=0',
    '?id=-1',
    '?id=1.5',
    '?id=1e2',
    '?id=abc',
    '?id=1&id=2',
    '?id=9007199254740992',
  ])('rejects invalid route %s without requesting a product', async (query) => {
    const { wrapper } = await render(`/details${query}`);
    expect(wrapper.get('[role="alert"]').text()).toContain(
      'product link is invalid',
    );
    expect(wrapper.get('a').attributes('href')).toBe('/list');
    expect(wrapper.find('[role="status"]').exists()).toBe(false);
    expect(getProductDetail).not.toHaveBeenCalled();
  });

  it('resets purchase feedback when the route switches to a different product', async () => {
    const { wrapper, router, cart } = await render('/details?id=1');
    await vi.waitFor(() => expect(wrapper.find('h1').text()).toBe('Product 1'));
    await wrapper.get('.actions button').trigger('click');
    expect(wrapper.get('[role="status"]').text()).toBe('Added to cart');
    await router.push('/details?id=2');
    await vi.waitFor(() => expect(wrapper.find('h1').text()).toBe('Product 2'));
    expect(wrapper.find('[role="status"]').exists()).toBe(false);
    await wrapper.get('.actions button').trigger('click');
    expect(cart.lines.map(({ product: item }) => item.id)).toEqual([1, 2]);
    expect(getProductDetail).toHaveBeenLastCalledWith(
      2,
      expect.any(AbortSignal),
    );
  });

  it('aborts a pending request when navigating to an invalid link', async () => {
    const gate = Promise.withResolvers<ProductItem>();
    let signal: AbortSignal | undefined;
    vi.mocked(getProductDetail).mockImplementationOnce((_id, requestSignal) => {
      signal = requestSignal;
      return gate.promise;
    });
    const { wrapper, router } = await render('/details?id=1');
    await vi.waitFor(() => expect(getProductDetail).toHaveBeenCalledOnce());
    await router.push('/details?id=bad');
    await vi.waitFor(() => expect(signal?.aborted).toBe(true));
    gate.resolve(product);
    await flushPromises();
    expect(wrapper.find('h1').exists()).toBe(false);
    expect(wrapper.get('[role="alert"]').text()).toContain(
      'product link is invalid',
    );
  });

  it('recovers from a failed request using the retry button', async () => {
    vi.mocked(getProductDetail).mockRejectedValueOnce(new Error('offline'));
    const { wrapper } = await render('/details?id=1');
    await vi.waitFor(() =>
      expect(wrapper.find('[role="alert"]').exists()).toBe(true),
    );
    await wrapper.get('[role="alert"] button').trigger('click');
    await vi.waitFor(() => expect(wrapper.find('h1').text()).toBe('Product 1'));
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });
});
