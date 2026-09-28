# @vh5/ai-chat

廠商中立串流同會話管理，唔依賴 UI。`FetchChatProvider` 用 POST + ReadableStream，composable 管訊息、狀態、重試、重新生成同中止。串流錯誤係 Error，唔經 Axios ApiError callback。

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

## 結束事件與 Scope 清理

收到 `finish` 後，composable 會即時關閉 Provider 迭代器，忽略之後嘅片段。停止時會先解除傳送中狀態，再取消傳輸；就算舊 Provider 未結束，都可以開始新請求。已取消請求遲返嘅內容或錯誤唔會覆蓋目前對話。
