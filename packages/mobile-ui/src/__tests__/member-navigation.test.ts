import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import { i18n, setupI18n } from '@vh5/locales';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ExamplesPage from '../ExamplesPage.vue';
import HomePage from '../HomePage.vue';
import MemberPage from '../MemberPage.vue';

enableAutoUnmount(afterEach);
beforeEach(async () => {
  localStorage.clear();
  await setupI18n(createApp({}));
});

async function plugins() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  });
  await router.push('/member');
  return [router, i18n];
}

describe('focused feature navigation', () => {
  it('keeps Home informational without duplicate navigation or a language selector', () => {
    const wrapper = mount(HomePage, {
      props: { framework: 'Vant' },
      global: { plugins: [i18n] },
    });
    expect(wrapper.findAll('a')).toHaveLength(0);
    expect(wrapper.find('select').exists()).toBe(false);
    expect(wrapper.text()).toContain('Streaming AI Chat');
  });

  it('gives each technical example one entry and leaves chat to the floating button', async () => {
    const wrapper = mount(ExamplesPage, {
      props: { framework: 'NutUI' },
      global: { plugins: await plugins() },
    });
    const links = wrapper.findAll('a').map((link) => link.attributes('href'));
    expect(links).toEqual([
      '/examples/query',
      '/examples/request',
      '/examples/mobile',
      '/examples/svg-icons',
      '/examples/pwa',
      '/examples/components',
    ]);
    expect(new Set(links).size).toBe(links.length);
  });
});

describe('member personal center', () => {
  it('shows guest account information, login and one language selector without unrelated links', async () => {
    const wrapper = mount(MemberPage, {
      props: { loggedIn: false, logout: vi.fn() },
      global: { plugins: await plugins() },
    });
    expect(wrapper.get('h1').text()).toBe('Personal center');
    expect(wrapper.get('.account-details').text()).toContain('Guest');
    expect(wrapper.findAll('a').map((link) => link.attributes('href'))).toEqual(
      ['/login'],
    );
    expect(wrapper.findAll('select')).toHaveLength(1);
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('renders supplied profile data and falls back safely for an absent display name', async () => {
    const wrapper = mount(MemberPage, {
      props: {
        loggedIn: true,
        logout: vi.fn(),
        name: 'Ada',
        avatar: '/avatar.png',
      },
      global: { plugins: await plugins() },
    });
    expect(wrapper.get('.profile-panel h2').text()).toBe('Ada');
    expect(wrapper.get('img').attributes('src')).toBe('/avatar.png');
    expect(wrapper.get('.avatar-fallback').text()).toBe('A');
    await wrapper.get('img').trigger('load');
    expect(wrapper.find('.avatar-fallback').exists()).toBe(false);
    await wrapper.get('img').trigger('error');
    expect(wrapper.get('.avatar-fallback').text()).toBe('A');
    expect(wrapper.get('.account-details').text()).toContain('Signed in');
    expect(wrapper.findAll('a')).toHaveLength(0);
    await wrapper.setProps({ name: ' ', avatar: undefined });
    expect(wrapper.get('.profile-panel h2').text()).toBe('Member');
    expect(wrapper.get('.avatar-fallback').text()).toBe('M');
  });

  it('prevents repeated logout requests while the first request is pending', async () => {
    let resolveLogout: () => void = () => {};
    const logout = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveLogout = resolve;
        }),
    );
    const wrapper = mount(MemberPage, {
      props: { loggedIn: true, logout },
      global: { plugins: await plugins() },
    });
    await wrapper.get('button').trigger('click');
    expect(wrapper.get('button').attributes('disabled')).toBeDefined();
    await wrapper.get('button').trigger('click');
    expect(logout).toHaveBeenCalledTimes(1);
    resolveLogout();
    await flushPromises();
    expect(wrapper.get('button').attributes('disabled')).toBeUndefined();
  });

  it('shows a failed logout and allows retry without discarding profile state', async () => {
    const logout = vi
      .fn()
      .mockRejectedValueOnce(new Error('Offline'))
      .mockResolvedValueOnce(undefined);
    const wrapper = mount(MemberPage, {
      props: { loggedIn: true, logout, name: 'Ada' },
      global: { plugins: await plugins() },
    });
    await wrapper.get('button').trigger('click');
    await flushPromises();
    expect(wrapper.get('[role="alert"]').text()).toContain('Please try again');
    expect(wrapper.get('.profile-panel h2').text()).toBe('Ada');
    await wrapper.get('button').trigger('click');
    await flushPromises();
    expect(logout).toHaveBeenCalledTimes(2);
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });
});
