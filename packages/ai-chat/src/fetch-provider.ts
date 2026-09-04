import type { ChatMessage, ChatOptions, ChatProvider } from './types';

import { parseEventStream } from './sse';

export interface FetchChatProviderOptions {
  endpoint?: string;
  fetch?: typeof globalThis.fetch;
  headers?: (() => HeadersInit) | HeadersInit;
}

export class FetchChatProvider implements ChatProvider {
  private readonly endpoint: string;
  private readonly fetcher: typeof globalThis.fetch;
  private readonly headers?: (() => HeadersInit) | HeadersInit;

  constructor(options: FetchChatProviderOptions = {}) {
    this.endpoint = options.endpoint ?? '/api/ai/chat';
    this.fetcher = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.headers = options.headers;
  }

  async *chat(messages: readonly ChatMessage[], options: ChatOptions = {}) {
    const headers =
      typeof this.headers === 'function' ? this.headers() : this.headers;
    const requestHeaders = new Headers(headers);
    requestHeaders.set('Content-Type', 'application/json');
    const response = await this.fetcher(this.endpoint, {
      body: JSON.stringify({
        conversationId: options.conversationId,
        messages,
      }),
      headers: requestHeaders,
      method: 'POST',
      signal: options.signal,
    });
    if (!response.ok) {
      throw new Error(`Chat request failed with HTTP ${response.status}`);
    }
    if (!response.body)
      throw new Error('Streaming response body is unavailable');
    yield* parseEventStream(response.body);
  }
}
