# 串流 AI Chat

三套版面提供主題色 AI 浮動入口，開啟延遲載入的 `/ai/chat`。共用 UI 位於 `packages/mobile-ui/src/ChatPage.vue`，應用傳入 token 與 endpoint。Chat、Login、Cart、Details 隱藏入口。介面預設英文，可切換簡體中文與日文；AI 輸出仍視為不可信內容，並非前端翻譯字典。

`/ai/chat` 依賴供應商無關的 `ChatProvider`。`FetchChatProvider` 以 `ReadableStream` 解析 SSE，`useStreamingChat` 管理訊息、狀態、Retry、Regenerate 與 `AbortController`。

Mock 會真實逐塊輸出。Markdown 必須先經 DOMPurify；AI Key 只可留在 Server。OpenAI、Claude、Gemini、DeepSeek 都可由 Adapter 接入而不改 UI。

## 使用配套 AI Service

原始碼儲存庫：

- [vue-h5-template-ai-service](https://github.com/fonghehe/vue-h5-template-ai-service) — AI 串流服務（連接埠 8001）
- [vue-h5-template-business-service](https://github.com/fonghehe/vue-h5-template-business-service) — 業務 API 服務（連接埠 8002）

複製命令與設定步驟請見[後端模式](../essentials/server.md)。

先以預設 `AI_PROVIDER=mock` 在 `8001` 啟動 `vue-h5-template-ai-service`，再執行 `pnpm dev:services:vant`。Vite 會串流轉送 `/api/ai/chat`；使用者已登入時，`FetchChatProvider` 亦會加入 Business Service 簽發的 Bearer Token。兩個服務使用相同 JWT 設定後，可啟用 `AI_AUTH_REQUIRED=true`。

使用真實模型時，只在 **AI Service** 設定 `AI_PROVIDER=openai-compatible`、`AI_BASE_URL`、`AI_API_KEY` 與 `AI_MODEL`。請勿把秘密放入應用的 `VITE_*` 變數，瀏覽器契約不需要改動。

## 結束事件與 Scope 清理

`finish` 是結束事件：composable 會立即關閉 Provider 迭代器，忽略後續片段。停止時先解除傳送中的狀態，再取消傳輸；即使舊 Provider 尚未結束，也能開始新請求。已取消請求延遲回傳的內容或錯誤不會覆蓋目前的對話。

在元件 setup 或 Vue effect scope 內建立時，銷毀 scope 會自動中止請求，並禁止後續生成。於 scope 外使用時，由呼叫端執行 `abort()`。複製提示會在 1.2 秒後清除，舊複製結果不會覆蓋新結果。捲動僅在 DOM 更新後監看訊息數、最後一則內容與狀態，避免每個 token 遍歷完整歷史。
