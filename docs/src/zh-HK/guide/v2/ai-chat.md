# Streaming AI Chat

三套 Layout 都有主題色 AI 浮動入口，開啟延遲載入嘅 `/ai/chat`。共用 UI 位於 `packages/mobile-ui/src/ChatPage.vue`，App 傳入 token 同 endpoint。Chat、Login、Cart、Details 隱藏入口。介面預設英文，可以切換簡體中文同日文；AI 輸出仍然係不可信內容，唔係前端翻譯字典。

`/ai/chat` 使用 Vendor-neutral `ChatProvider`。`FetchChatProvider` 用 `ReadableStream` 解析 SSE，`useStreamingChat` 管 Messages、Status、Retry、Regenerate 同 `AbortController`。

Mock 會真實逐個 Chunk 輸出。Markdown 一定要先經 DOMPurify；AI Key 只可以留喺 Server。OpenAI、Claude、Gemini、DeepSeek 可以靠 Adapter 接入，唔使改 UI。

## 使用配套 AI Service

先用預設 `AI_PROVIDER=mock` 喺 `8001` 啟動 `vue-h5-template-ai-service`，再執行 `pnpm dev:services:vant`。Vite 會以串流方式轉發 `/api/ai/chat`；用戶已登入時，`FetchChatProvider` 亦會加上 Business Service 簽發嘅 Bearer Token。兩個服務使用相同 JWT 設定後，可以啟用 `AI_AUTH_REQUIRED=true`。

使用真實模型時，只喺 **AI Service** 設定 `AI_PROVIDER=openai-compatible`、`AI_BASE_URL`、`AI_API_KEY` 同 `AI_MODEL`。唔好將秘密放入應用嘅 `VITE_*` 變數，瀏覽器契約唔需要改。
