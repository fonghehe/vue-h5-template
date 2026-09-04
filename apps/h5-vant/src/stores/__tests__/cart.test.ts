import type { ProductItem } from '@/api/product';

import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { useCartStore } from '../cart';

const product: ProductItem = {
  delivery: 'Today',
  description: 'A useful product',
  id: 1,
  imgUrl: 'https://example.com/product.webp',
  price: '12.50',
  shopDesc: 'Official',
  shopName: 'Template Shop',
  title: 'Mobile starter kit',
  vipPrice: '10.00',
};

describe('cart store', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('adds products, caps quantity and computes selected totals', () => {
    const cart = useCartStore();

    cart.add(product, 2);
    cart.add(product, 100);

    expect(cart.lines).toHaveLength(1);
    expect(cart.itemCount).toBe(99);
    expect(cart.selectedCount).toBe(99);
    expect(cart.selectedTotal).toBe(123_750);
  });

  it('updates selection and removes selected lines', () => {
    const cart = useCartStore();
    cart.add(product);

    cart.toggle(product.id);
    expect(cart.selectedCount).toBe(0);
    cart.toggleAll();
    cart.clearSelected();

    expect(cart.lines).toEqual([]);
  });
});
