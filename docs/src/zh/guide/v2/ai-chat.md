# 流式 AI Chat

三套布局均提供主题色 AI 悬浮入口，打开懒加载的 `/ai/chat`。共享 UI 位于 `packages/mobile-ui/src/ChatPage.vue`，各应用传入当前会话 token 和 endpoint。Chat、Login、Cart、Details 隐藏入口。界面默认英文并支持中文、日文；服务商响应仍是不可信内容，不属于前端翻译字典。

`/ai/chat` 没有绑定任何 AI 厂商，而是依赖轻量 `ChatProvider` 接口。`FetchChatProvider` 通过 `POST /api/ai/chat` 发送消息，并从 `ReadableStream` 解析 SSE；`useStreamingChat` 管理 messages、status、error、regenerate、retry 和 `AbortController`。点击 Stop 会立即终止请求。

Nitro Mock 会真实地按时间发送多个 chunk，不是一次性 `setTimeout` 返回。页面支持 Suggested Prompts、逐块渲染、Markdown、代码块、复制、停止、重试、重新生成、textarea 自动增高、独立滚动与 Safe Area。

AI 内容始终不可信：Marked 只负责解析，进入 `v-html` 前必须经过 DOMPurify。模板没有引入较重的 Vercel AI SDK，也没有默认加入 Shiki；当前抽象已经能替换为 OpenAI、Claude、Gemini、DeepSeek 或自建网关，语法高亮可在业务需要时动态导入。Provider Key 必须留在服务端。

## 使用配套 AI Service

源码仓库：

- [vue-h5-template-ai-service](https://github.com/fonghehe/vue-h5-template-ai-service) — AI 流式服务（端口 8001）
- [vue-h5-template-business-service](https://github.com/fonghehe/vue-h5-template-business-service) — 业务 API 服务（端口 8002）

克隆命令和配置步骤见[后端模式](../essentials/server.md)。

先以默认 `AI_PROVIDER=mock` 在 `8001` 端口启动 `vue-h5-template-ai-service`，再执行 `pnpm dev:services:vant`。Vite 会把 `/api/ai/chat` 转发到 AI Service，并保持 SSE 流不被前端缓冲；用户已登录时，`FetchChatProvider` 还会附加 Business Service 签发的 Bearer Token。两个服务使用相同 JWT 配置后，也可以启用 `AI_AUTH_REQUIRED=true`。

接入真实模型时，只在 **AI Service** 中配置 `AI_PROVIDER=openai-compatible`、`AI_BASE_URL`、`AI_API_KEY` 和 `AI_MODEL`，不要写进应用的 `VITE_*` 变量。浏览器端协议和页面都不需要改变。
