import { enableAutoUnmount, mount } from '@vue/test-utils';

import { afterEach, describe, expect, it } from 'vitest';

import SvgIcon from '../SvgIcon.vue';

enableAutoUnmount(afterEach);
afterEach(() => document.querySelector('#vh5-shared-svg-sprite')?.remove());

describe('shared commerce icons', () => {
  it('installs one sprite with stroke-based icons and preserves their SVG geometry', () => {
    const wrapper = mount(SvgIcon, {
      props: { name: 'shopping-bag', size: 22 },
    });
    mount(SvgIcon, { props: { name: 'cart-add' } });
    expect(document.querySelectorAll('#vh5-shared-svg-sprite')).toHaveLength(1);
    const symbol = document.querySelector('#vh5-shared-icon-shopping-bag');
    expect(symbol?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(symbol?.querySelector('g')?.getAttribute('stroke')).toBe(
      'currentColor',
    );
    expect(symbol?.querySelectorAll('path')).toHaveLength(2);
    expect(wrapper.get('use').attributes('href')).toBe(
      '#vh5-shared-icon-shopping-bag',
    );
  });

  it('reinstalls a removed sprite and gives titled icons an accessible name', () => {
    mount(SvgIcon, { props: { name: 'check' } });
    document.querySelector('#vh5-shared-svg-sprite')?.remove();
    const wrapper = mount(SvgIcon, {
      props: { name: 'credit-card', title: 'Card', size: '2rem' },
    });
    expect(
      document.querySelector('#vh5-shared-icon-credit-card'),
    ).not.toBeNull();
    expect(wrapper.attributes('aria-label')).toBe('Card');
    expect(wrapper.get('title').text()).toBe('Card');
  });
});
