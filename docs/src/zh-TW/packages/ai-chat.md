# @vh5/ai-chat

廠商中立串流與會話管理，不依賴 UI。`FetchChatProvider` 使用 POST + ReadableStream，composable 管訊息、狀態、重試、重新生成及中止。串流錯誤為 Error，不經 Axios ApiError 回呼。

```ts
interface ChatProvider {
  chat(messages: readonly ChatMessage[], options?: ChatOptions): AsyncIterable<ChatChunk>;
}
```

`ChatChunk`: `start` / `delta` / `error` / `finish`. `ChatOptions`: `signal?`, `conversationId?`.

```bash
pnpm -F @vh5/ai-chat type-check
```

[參考: AI Chat](../guide/v2/ai-chat.md) · [參考: backend](../guide/essentials/server.md)
