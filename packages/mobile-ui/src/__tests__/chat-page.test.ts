import { flushPromises, mount } from '@vue/test-utils';
import { createApp } from 'vue';

import { getChatSuggestions } from '@vh5/api-client';
import { i18n, setupI18n } from '@vh5/locales';

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
