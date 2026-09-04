import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { afterEach, expect, it, vi } from 'vitest';

import CommerceDock from '../CommerceDock.vue';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('reserves the measured bar height, follows resizing and disconnects on unmount', async () => {
  let height = 128.5;
  let resize = () => {};
  const disconnect = vi.fn();
  const observe = vi.fn();
  vi.stubGlobal(
    'ResizeObserver',
    class {
      disconnect = disconnect;
      observe = observe;
      constructor(callback: () => void) {
        resize = callback;
      }
    },
  );
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    () => new DOMRect(0, 0, 390, height),
  );
  const wrapper = mount(CommerceDock, {
    attrs: { class: 'cart-summary' },
    slots: { default: '<button>Checkout</button>' },
  });
  try {
    await nextTick();
    expect(wrapper.get('.commerce-dock-space').attributes('style')).toContain(
      'height: 129px',
    );
    expect(observe).toHaveBeenCalledWith(wrapper.get('footer').element, {
      box: 'border-box',
    });
    expect(wrapper.get('footer').classes()).toContain('cart-summary');
    height = 180;
    resize();
    await nextTick();
    expect(wrapper.get('.commerce-dock-space').attributes('style')).toContain(
      'height: 180px',
    );
  } finally {
    wrapper.unmount();
  }
  expect(disconnect).toHaveBeenCalledOnce();
});
