# @vh5/ai-chat

ベンダー非依存のストリームと会話管理で UI に依存しません。`FetchChatProvider` は POST + ReadableStream、`useStreamingChat` はメッセージ・状態・retry/regenerate/abort を担当。HTTP ストリームの失敗は Error で、Axios ApiError callback を通りません。

```ts
interface ChatProvider {
  chat(messages: readonly ChatMessage[], options?: ChatOptions): AsyncIterable<ChatChunk>;
}
```

`ChatChunk`: `start` / `delta` / `error` / `finish`. `ChatOptions`: `signal?`, `conversationId?`.

```bash
pnpm -F @vh5/ai-chat type-check
```

[参照: AI Chat](../guide/v2/ai-chat.md) · [参照: backend](../guide/essentials/server.md)
