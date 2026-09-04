import type { ChatProvider } from '../types';

import { watch } from 'vue';

import { describe, expect, it, vi } from 'vitest';

import { useStreamingChat } from '../use-streaming-chat';

describe('useStreamingChat', () => {
  it('notifies Vue observers for every delta, not only status transitions', async () => {
    const provider: ChatProvider = {
      async *chat() {
        yield { delta: 'Vue ', type: 'delta' };
        yield { delta: '3', type: 'delta' };
      },
    };
    const chat = useStreamingChat(provider);
    const observed: string[] = [];
    const stop = watch(
      () => chat.messages.value.at(-1)?.content,
      (content) => {
        if (content) observed.push(content);
      },
      { flush: 'sync' },
    );
    await chat.sendMessage('Hello');
    stop();
    expect(observed).toContain('Vue ');
    expect(observed).toContain('Vue 3');
  });

  it('ignores empty input and duplicate submissions while busy', async () => {
    const gate = Promise.withResolvers<undefined>();
    const call = vi.fn();
    const chat = useStreamingChat({
      async *chat() {
        call();
        await gate.promise;
        yield { delta: 'done', type: 'delta' };
      },
    });
    await chat.sendMessage('  ');
    const pending = chat.sendMessage('  Hello  ');
    await chat.sendMessage('duplicate');
    await chat.regenerate();
    expect(chat.messages.value[0]?.content).toBe('Hello');
    expect(chat.messages.value).toHaveLength(2);
    expect(call).toHaveBeenCalledOnce();
    gate.resolve(undefined);
    await pending;
  });

  it('retries a failed response without duplicating the user message', async () => {
    let attempts = 0;
    const chat = useStreamingChat({
      async *chat() {
        yield ++attempts === 1
          ? { message: 'Unavailable', type: 'error' }
          : { delta: 'Recovered', type: 'delta' };
      },
    });
    await chat.retry();
    await chat.regenerate();
    expect(attempts).toBe(0);
    await chat.sendMessage('Hello');
    expect(chat.status.value).toBe('error');
    expect(chat.error.value?.message).toBe('Unavailable');
    await chat.retry();
    expect(chat.status.value).toBe('idle');
    expect(chat.error.value).toBeUndefined();
    expect(chat.messages.value.map(({ content }) => content)).toEqual([
      'Hello',
      'Recovered',
    ]);
    await chat.retry();
    expect(attempts).toBe(2);
  });

  it.each(['abort', 'clear'] as const)(
    '%s immediately detaches old work without corrupting a new stream',
    async (action) => {
      const oldGate = Promise.withResolvers<undefined>();
      const newGate = Promise.withResolvers<undefined>();
      let oldSignal: AbortSignal | undefined;
      let attempts = 0;
      const chat = useStreamingChat({
        async *chat(_messages, options) {
          if (++attempts === 1) {
            oldSignal = options?.signal;
            await oldGate.promise;
            throw new Error('Late failure from cancelled work');
          }
          yield { delta: 'New ', type: 'delta' };
          await newGate.promise;
          yield { delta: 'response', type: 'delta' };
        },
      });
      const oldRequest = chat.sendMessage('Old question');
      chat[action]();
      expect(oldSignal?.aborted).toBe(true);
      expect(chat.streaming.value).toBe(false);
      expect(chat.messages.value.map(({ content }) => content)).toEqual(
        action === 'clear' ? [] : ['Old question', ''],
      );
      const newRequest = chat.sendMessage('New question');
      await vi.waitFor(() =>
        expect(chat.messages.value.at(-1)?.content).toBe('New '),
      );
      oldGate.resolve(undefined);
      await oldRequest;
      expect(chat.streaming.value).toBe(true);
      expect(chat.error.value).toBeUndefined();
      newGate.resolve(undefined);
      await newRequest;
      expect(chat.messages.value.at(-1)?.content).toBe('New response');
      expect(chat.status.value).toBe('idle');
    },
  );

  it('accumulates streamed chunks and can regenerate', async () => {
    let callCount = 0;
    const provider: ChatProvider = {
      async *chat() {
        callCount += 1;
        yield { type: 'start' };
        yield { delta: 'Vue ', type: 'delta' };
        yield { delta: '3', type: 'delta' };
        yield { reason: 'stop', type: 'finish' };
      },
    };
    let id = 0;
    const chat = useStreamingChat(provider, {
      createId: () => `id-${++id}`,
      now: () => 1,
    });

    await chat.sendMessage('What is Vue?');
    expect(chat.messages.value.map((message) => message.content)).toEqual([
      'What is Vue?',
      'Vue 3',
    ]);

    await chat.regenerate();
    expect(callCount).toBe(2);
    expect(chat.messages.value.at(-1)?.content).toBe('Vue 3');
  });
});
