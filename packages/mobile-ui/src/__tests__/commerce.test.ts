import type { ProductItem } from '@vh5/api-client';

import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { createApp, nextTick } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import { i18n, setupI18n } from '@vh5/locales';

import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useCartStore } from '../cart';
import CartPage from '../CartPage.vue';
import PaymentPage from '../PaymentPage.vue';

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

beforeEach(async () => {
  localStorage.clear();
  await setupI18n(createApp({}));
});
enableAutoUnmount(afterEach);

async function mountPage(
  component: typeof CartPage | typeof PaymentPage,
  path: string,
) {
  const pinia = createPinia().use(createPersistedState());
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/cart', component: CartPage },
      { path: '/payment', component: PaymentPage },
      { path: '/list', component: { template: '<div>Products</div>' } },
      { path: '/details', component: { template: '<div>Details</div>' } },
    ],
  });
  await router.push(path);
  await router.isReady();
  const wrapper = mount(component, {
    global: { plugins: [pinia, router, i18n] },
  });
  return { wrapper, cart: useCartStore(pinia), router };
}

describe('cart interactions', () => {
  it('shows a useful empty state', async () => {
    const { wrapper } = await mountPage(CartPage, '/cart');
    expect(wrapper.get('h1').text()).toBe('Your cart is empty');
    expect(wrapper.get('a').attributes('href')).toBe('/list');
    expect(wrapper.find('.cart-summary').exists()).toBe(false);
  });

  it('updates quantities, selection and checkout navigation', async () => {
    const { wrapper, cart, router } = await mountPage(CartPage, '/cart');
    cart.add(product);
    await nextTick();
    expect(
      wrapper
        .get('button[aria-label="Decrease quantity"]')
        .attributes('disabled'),
    ).toBeDefined();
    await wrapper
      .get('button[aria-label="Increase quantity"]')
      .trigger('click');
    expect(cart.itemCount).toBe(2);
    await wrapper.get('input[type="number"]').setValue('99');
    expect(cart.itemCount).toBe(99);
    expect(
      wrapper
        .get('button[aria-label="Increase quantity"]')
        .attributes('disabled'),
    ).toBeDefined();
    await wrapper.get('.select-all input').setValue(false);
    expect(wrapper.get('.commerce-cta').attributes('disabled')).toBeDefined();
    await wrapper.get('.select-all input').setValue(true);
    await wrapper.get('.commerce-cta').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/payment');
  });

  it('removes a product and returns to the empty state', async () => {
    const { wrapper, cart } = await mountPage(CartPage, '/cart');
    cart.add(product);
    await nextTick();
    await wrapper
      .get('button[aria-label="Remove Everyday bag"]')
      .trigger('click');
    expect(cart.lines).toEqual([]);
    expect(wrapper.get('h1').text()).toBe('Your cart is empty');
  });
});

describe('demo payment', () => {
  it.each(['wechat', 'alipay', 'card'])(
    'confirms %s once, shows a receipt and persists an empty cart',
    async (method) => {
      const { wrapper, cart } = await mountPage(PaymentPage, '/payment');
      cart.add(product, 2);
      cart.add({ ...product, id: 2, price: '100.00' });
      cart.toggle(2);
      await nextTick();
      expect(wrapper.get('.order-amount').text()).toContain('25.00');
      await wrapper.get(`input[value="${method}"]`).setValue(true);
      expect(cart.lines).toHaveLength(2);
      await wrapper.get('button.commerce-cta').trigger('click');
      expect(wrapper.get('h1').text()).toBe('Payment successful');
      expect(wrapper.get('.receipt').text()).toContain('25.00');
      expect(cart.lines).toEqual([]);
      expect(JSON.parse(localStorage.getItem('cart') ?? '{}')).toEqual({
        lines: [],
      });
      expect(wrapper.find('button.commerce-cta').exists()).toBe(false);
      expect(wrapper.get('a.commerce-cta').attributes('href')).toBe('/list');
    },
  );

  it('does not allow paying an empty or unselected cart', async () => {
    const { wrapper, cart } = await mountPage(PaymentPage, '/payment');
    expect(wrapper.get('h1').text()).toBe('Nothing to check out');
    cart.add(product);
    cart.toggle(1);
    await nextTick();
    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper.get('a.commerce-cta').attributes('href')).toBe('/cart');
    expect(cart.lines).toHaveLength(1);
  });
});
