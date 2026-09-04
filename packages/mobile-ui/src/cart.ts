// Include the plugin's Pinia augmentation even when this package is checked alone.
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

import type { ProductItem } from '@vh5/api-client';

import { defineStore } from 'pinia';

export interface CartLine {
  product: ProductItem;
  quantity: number;
  selected: boolean;
}

interface CartState {
  lines: CartLine[];
}

function priceInCents(value: string): number {
  const price = Number.parseFloat(value);
  return Number.isFinite(price) ? Math.round(price * 100) : 0;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({ lines: [] }),
  getters: {
    allSelected: (state) =>
      state.lines.length > 0 && state.lines.every((line) => line.selected),
    itemCount: (state) =>
      state.lines.reduce((total, line) => total + line.quantity, 0),
    selectedCount: (state) =>
      state.lines
        .filter((line) => line.selected)
        .reduce((total, line) => total + line.quantity, 0),
    selectedTotal: (state) =>
      state.lines
        .filter((line) => line.selected)
        .reduce(
          (total, line) =>
            total + priceInCents(line.product.price) * line.quantity,
          0,
        ),
  },
  actions: {
    add(product: ProductItem, quantity = 1) {
      const normalizedQuantity = Math.min(99, Math.max(1, quantity));
      const current = this.lines.find((line) => line.product.id === product.id);
      if (current) {
        current.product = product;
        current.quantity = Math.min(99, current.quantity + normalizedQuantity);
        current.selected = true;
        return;
      }
      this.lines.push({
        product,
        quantity: normalizedQuantity,
        selected: true,
      });
    },
    clearSelected() {
      this.lines = this.lines.filter((line) => !line.selected);
    },
    remove(productId: number) {
      this.lines = this.lines.filter((line) => line.product.id !== productId);
    },
    setQuantity(productId: number, quantity: number) {
      const line = this.lines.find((item) => item.product.id === productId);
      if (!line) return;
      line.quantity = Math.min(99, Math.max(1, Math.trunc(quantity)));
    },
    toggle(productId: number) {
      const line = this.lines.find((item) => item.product.id === productId);
      if (line) line.selected = !line.selected;
    },
    toggleAll() {
      const selected = !this.allSelected;
      for (const line of this.lines) line.selected = selected;
    },
  },
  persist: {
    pick: ['lines'],
    storage: localStorage,
  } satisfies PersistenceOptions<CartState>,
});
