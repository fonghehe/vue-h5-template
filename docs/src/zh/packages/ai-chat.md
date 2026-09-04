# @vh5/ai-chat

与厂商无关的流协议和会话生命周期，不依赖 UI 框架。`FetchChatProvider` 用 POST + ReadableStream；`useStreamingChat` 管消息、状态、重试、重新生成及中止。流式 HTTP 错误是普通 Error，不经过 Axios ApiError 回调。

```ts
interface ChatProvider {
  chat(messages: readonly ChatMessage[], options?: ChatOptions): AsyncIterable<ChatChunk>;
}
```

`ChatChunk`: `start` / `delta` / `error` / `finish`. `ChatOptions`: `signal?`, `conversationId?`.

```bash
pnpm -F @vh5/ai-chat type-check
```

[参考: AI Chat](../guide/v2/ai-chat.md) · [参考: backend](../guide/essentials/server.md)
