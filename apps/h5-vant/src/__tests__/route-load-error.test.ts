import { enableAutoUnmount, mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';

import { afterEach, describe, expect, it, vi } from 'vitest';

import App from '../App.vue';

vi.mock('@vh5/locales', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));
vi.mock('@vh5/utils', () => ({ stopProgress: vi.fn() }));
enableAutoUnmount(afterEach);

describe('route loading recovery', () => {
  it('keeps the current page and offers a document reload for a failed lazy destination', async () => {
    const router = createRouter({
      history: createMemoryHistory('/mobile/'),
      routes: [
        { path: '/', component: { template: '<p>Current page</p>' } },
        {
          path: '/request',
          component: () => Promise.reject(new Error('Chunk unavailable')),
        },
        { path: '/other', component: { template: '<p>Other page</p>' } },
      ],
    });
    await router.push('/');
    const wrapper = mount(App, { global: { plugins: [router] } });
    await expect(router.push('/request?from=examples')).rejects.toThrow(
      'Chunk unavailable',
    );
    await vi.waitFor(() =>
      expect(wrapper.find('[role="alert"]').exists()).toBe(true),
    );
    expect(wrapper.text()).toContain('Current page');
    expect(wrapper.get('[role="alert"] a').attributes('href')).toBe(
      '/mobile/request?from=examples',
    );
    expect(wrapper.get('[role="alert"]').text()).toContain(
      'mobile.routeLoadFailed',
    );
    await router.push('/other');
    await vi.waitFor(() =>
      expect(wrapper.find('[role="alert"]').exists()).toBe(false),
    );
    expect(wrapper.text()).toContain('Other page');
  });
});
