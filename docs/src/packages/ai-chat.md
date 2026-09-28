# @vh5/ai-chat

Provider-neutral streaming protocol and conversation lifecycle. This package has no UI framework dependency. `FetchChatProvider` uses POST + ReadableStream; `useStreamingChat` owns messages, status, retry, regenerate and abort. HTTP streaming errors are regular Error values, not Axios ApiError callbacks.

```ts
interface ChatProvider {
  chat(messages: readonly ChatMessage[], options?: ChatOptions): AsyncIterable<ChatChunk>;
}
```

`ChatChunk`: `start` / `delta` / `error` / `finish`. `ChatOptions`: `signal?`, `conversationId?`.

```bash
pnpm -F @vh5/ai-chat type-check
```

## Stream completion and scope disposal

`finish` is terminal: the composable closes the provider iterator immediately and ignores trailing chunks. Stopping releases the busy state before aborting the transport, so a new request can start even if an old provider has not settled. Late output or failure from cancelled work cannot overwrite the current conversation.

[Reference: AI Chat](../guide/v2/ai-chat.md) · [Reference: backend](../guide/essentials/server.md)
