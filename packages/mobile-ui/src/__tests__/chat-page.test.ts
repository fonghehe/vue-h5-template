import { flushPromises, mount } from '@vue/test-utils';
import { createApp } from 'vue';

import { getChatSuggestions } from '@vh5/api-client';
import { i18n, setupI18n } from '@vh5/locales';

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ChatPage from '../ChatPage.vue';
vi.mock('@vh5/api-client', () => ({
  getChatSuggestions: vi.fn().mockResolvedValue([]),
}));

const state = vi.hoisted(() => ({
  signal: undefined as AbortSignal | undefined,
}));
vi.mock('@vh5/ai-chat', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@vh5/ai-chat')>();
  return {
    ...actual,
    FetchChatProvider: class {
      async *chat(_messages: unknown, options: { signal: AbortSignal }) {
        state.signal = options.signal;
        yield { type: 'start', id: 'test' };
        yield { type: 'delta', delta: 'Hello Vue' };
        await new Promise<void>((resolve) =>
          options.signal.addEventListener('abort', () => resolve(), {
            once: true,
          }),
        );
      }
    },
  };
});

describe('chat page lifecycle', () => {
  beforeEach(() =>
    vi.mocked(getChatSuggestions).mockReset().mockResolvedValue([]),
  );
  beforeEach(async () => {
    localStorage.clear();
    await setupI18n(createApp({}));
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('reports clipboard denial without interrupting the conversation and clears feedback', async () => {
    const writeText = vi
      .fn()
      .mockRejectedValueOnce(new Error('permission denied'));
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = mount(ChatPage, {
      global: { plugins: [i18n, [VueQueryPlugin, { queryClient: client }]] },
    });
    try {
      await wrapper.get('.empty-state button').trigger('click');
      await flushPromises();
      vi.useFakeTimers();
      await wrapper.get('.message-actions button').trigger('click');
      await flushPromises();
      expect(wrapper.get('.copy-notice').text()).toBe(
        i18n.global.t('mobile.copyFailed'),
      );
      expect(wrapper.text()).toContain('Hello Vue');
      expect(writeText).toHaveBeenCalledWith('Hello Vue');
      await vi.advanceTimersByTimeAsync(1200);
      expect(wrapper.find('.copy-notice').exists()).toBe(false);
    } finally {
      wrapper.unmount();
      client.clear();
    }
  });

  it('keeps the newest clipboard result when an older request fails late', async () => {
    const old = Promise.withResolvers<undefined>();
    const writeText = vi
      .fn()
      .mockReturnValueOnce(old.promise)
      .mockResolvedValueOnce(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = mount(ChatPage, {
      global: { plugins: [i18n, [VueQueryPlugin, { queryClient: client }]] },
    });
    try {
      await wrapper.get('.empty-state button').trigger('click');
      await flushPromises();
      await wrapper.get('.message-actions button').trigger('click');
      await wrapper.get('.message-actions button').trigger('click');
      await flushPromises();
      old.reject(new Error('Late failure'));
      await flushPromises();
      expect(wrapper.get('.copy-notice').text()).toBe(
        i18n.global.t('mobile.copied'),
      );
    } finally {
      wrapper.unmount();
      client.clear();
    }
  });

  it('aborts a pending stream when the user leaves the page', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = mount(ChatPage, {
      global: {
        plugins: [
          i18n,
          [
            VueQueryPlugin,
            {
              queryClient,
            },
          ],
        ],
      },
    });
    await wrapper.get('.empty-state button').trigger('click');
    await flushPromises();
    expect(state.signal?.aborted).toBe(false);
    wrapper.unmount();
    await flushPromises();
    expect(state.signal?.aborted).toBe(true);
    queryClient.clear();
  });

  it('shows remote suggestions and retains local suggestions when offline', async () => {
    vi.mocked(getChatSuggestions).mockResolvedValueOnce(['Remote prompt']);
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = mount(ChatPage, {
      global: { plugins: [i18n, [VueQueryPlugin, { queryClient: client }]] },
    });
    await vi.waitFor(() => expect(wrapper.text()).toContain('Remote prompt'));
    wrapper.unmount();
    client.clear();
    vi.mocked(getChatSuggestions).mockRejectedValueOnce(new Error('offline'));
    const offlineClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const offline = mount(ChatPage, {
      global: {
        plugins: [i18n, [VueQueryPlugin, { queryClient: offlineClient }]],
      },
    });
    await flushPromises();
    expect(offline.findAll('.empty-state button')).toHaveLength(3);
    offline.unmount();
    offlineClient.clear();
  });
});
