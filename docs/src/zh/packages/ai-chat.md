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

## 结束事件与 Scope 清理

`finish` 是结束事件：composable 会立即关闭 Provider 迭代器，忽略后续分片。停止操作先释放发送状态，再取消传输；即使旧 Provider 尚未结束，也可以发起新请求。被取消请求的迟到内容或错误不能覆盖当前会话。
