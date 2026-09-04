import type { ChatProvider } from '../types';

import { describe, expect, it } from 'vitest';

import { useStreamingChat } from '../use-streaming-chat';

describe('useStreamingChat', () => {
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
