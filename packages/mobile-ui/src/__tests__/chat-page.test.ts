import { flushPromises, mount } from '@vue/test-utils';
import { createApp } from 'vue';

import { i18n, setupI18n } from '@vh5/locales';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import ChatPage from '../ChatPage.vue';

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
  beforeEach(async () => {
    localStorage.clear();
    await setupI18n(createApp({}));
  });
  it('aborts a pending stream when the user leaves the page', async () => {
    const wrapper = mount(ChatPage, { global: { plugins: [i18n] } });
    await wrapper.get('.empty-state button').trigger('click');
    await flushPromises();
    expect(state.signal?.aborted).toBe(false);
    wrapper.unmount();
    await flushPromises();
    expect(state.signal?.aborted).toBe(true);
  });
});
