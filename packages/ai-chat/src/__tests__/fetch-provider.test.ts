import type { ChatChunk, ChatMessage } from '../types';

import { describe, expect, it, vi } from 'vitest';

import { FetchChatProvider } from '../fetch-provider';

const messages: ChatMessage[] = [
  { content: 'Hello', createdAt: 1, id: 'user-1', role: 'user' },
];

async function collect(provider: FetchChatProvider, signal?: AbortSignal) {
  const chunks: ChatChunk[] = [];
  for await (const chunk of provider.chat(messages, {
    conversationId: 'conversation-1',
    signal,
  }))
    chunks.push(chunk);
  return chunks;
}

describe('fetchChatProvider', () => {
  it('posts history and streams events with current credentials and the abort signal', async () => {
    let token = 'first';
    const fetcher = vi
      .fn<typeof fetch>()
      .mockImplementation(
        async () => new Response('data: {"type":"delta","delta":"Hello"}\n\n'),
      );
    const provider = new FetchChatProvider({
      endpoint: '/api/ai/chat',
      fetch: fetcher,
      headers: () => ({ Authorization: `Bearer ${token}` }),
    });
    const controller = new AbortController();
    await expect(collect(provider, controller.signal)).resolves.toEqual([
      { delta: 'Hello', type: 'delta' },
    ]);
    token = 'refreshed';
    await collect(provider);
    const [endpoint, options] = fetcher.mock.calls[0] ?? [];
    expect(endpoint).toBe('/api/ai/chat');
    expect(options?.method).toBe('POST');
    expect(options?.signal).toBe(controller.signal);
    expect(JSON.parse(String(options?.body))).toEqual({
      conversationId: 'conversation-1',
      messages,
    });
    expect(new Headers(options?.headers).get('Content-Type')).toBe(
      'application/json',
    );
    expect(new Headers(options?.headers).get('Authorization')).toBe(
      'Bearer first',
    );
    expect(
      new Headers(fetcher.mock.calls[1]?.[1]?.headers).get('Authorization'),
    ).toBe('Bearer refreshed');
  });

  it.each([401, 429, 500])(
    'rejects HTTP %i without parsing it as SSE',
    async (status) => {
      const provider = new FetchChatProvider({
        fetch: vi
          .fn<typeof fetch>()
          .mockResolvedValue(new Response('error', { status })),
      });
      await expect(collect(provider)).rejects.toThrow(`HTTP ${status}`);
    },
  );

  it('rejects a response without a stream', async () => {
    const provider = new FetchChatProvider({
      fetch: vi.fn<typeof fetch>().mockResolvedValue(new Response(null)),
    });
    await expect(collect(provider)).rejects.toThrow(
      'Streaming response body is unavailable',
    );
  });

  it('preserves transport cancellation errors', async () => {
    const aborted = new DOMException('Stopped', 'AbortError');
    const provider = new FetchChatProvider({
      fetch: vi.fn<typeof fetch>().mockRejectedValue(aborted),
    });
    await expect(collect(provider)).rejects.toBe(aborted);
  });
});
