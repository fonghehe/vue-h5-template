import type { ProductItem } from '@vh5/api-client';

import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { useCartStore } from '../cart';

const product: ProductItem = {
  delivery: 'Today',
  description: 'Product',
  id: 1,
  imgUrl: 'https://example.com/product.webp',
  price: '0.10',
  shopDesc: 'Official',
  shopName: 'Shop',
  title: 'Product',
  vipPrice: '0.10',
};

describe('shared cart boundaries', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('computes currency in integer cents and ignores unselected lines', () => {
    const cart = useCartStore();
    expect(cart.allSelected).toBe(false);
    cart.add(product, 3);
    cart.add({ ...product, id: 2, price: '0.20' });
    expect(cart.selectedTotal).toBe(50);
    cart.toggle(2);
    expect(cart.selectedTotal).toBe(30);
    expect(cart.selectedCount).toBe(3);
    expect(cart.itemCount).toBe(4);
    cart.clearSelected();
    expect(cart.lines.map(({ product }) => product.id)).toEqual([2]);
  });

  it('reselects existing products, updates their details and handles missing IDs', () => {
    const cart = useCartStore();
    cart.add(product);
    cart.toggle(1);
    cart.add({ ...product, title: 'Updated' }, 2);
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0]).toMatchObject({
      product: { title: 'Updated' },
      quantity: 3,
      selected: true,
    });
    cart.setQuantity(999, 2);
    cart.toggle(999);
    cart.remove(999);
    expect(cart.itemCount).toBe(3);
    cart.remove(1);
    expect(cart.lines).toEqual([]);
  });

  it.each([
    [-5, 1],
    [0, 1],
    [2.9, 2],
    [100, 99],
    [Number.NaN, 1],
    [Infinity, 1],
  ])('normalizes quantity %s to %s consistently', (quantity, expected) => {
    const cart = useCartStore();
    cart.add(product, quantity);
    expect(cart.itemCount).toBe(expected);
    cart.setQuantity(product.id, quantity);
    expect(cart.itemCount).toBe(expected);
    expect(Number.isFinite(cart.selectedTotal)).toBe(true);
  });

  it('treats a non-numeric price as zero and toggles all selections', () => {
    const cart = useCartStore();
    cart.add({ ...product, price: 'unknown' });
    expect(cart.selectedTotal).toBe(0);
    expect(cart.allSelected).toBe(true);
    cart.toggleAll();
    expect(cart.allSelected).toBe(false);
    cart.toggleAll();
    expect(cart.allSelected).toBe(true);
  });
});
