# Streaming AI Chat

The themed floating entry is available in all three layouts and opens the lazy `/ai/chat` page. Shared UI lives in `packages/mobile-ui/src/ChatPage.vue`; wrappers pass the current session token and endpoint. Chat, Login, Cart and Details hide the entry. UI copy supports English (default), Chinese and Japanese; provider output remains untrusted content, not a frontend translation dictionary.

The `/ai/chat` page uses a lightweight provider-neutral protocol instead of binding the template to one AI vendor.

```ts
interface ChatProvider {
  chat(
    messages: readonly ChatMessage[],
    options?: ChatOptions,
  ): AsyncIterable<ChatChunk>;
}
```

`FetchChatProvider` sends `POST /api/ai/chat` and parses SSE frames from `ReadableStream`. `useStreamingChat` owns messages, status, error, regeneration, retry and `AbortController`. Clicking Stop aborts the fetch immediately. The Nitro mock sends real timed chunks rather than a one-shot timeout response.

The UI supports suggested prompts, incremental rendering, Markdown, code blocks, copy, stop, retry, regenerate, automatic textarea growth, contained scrolling and safe-area padding. Marked only parses Markdown; DOMPurify is the required trust boundary before `v-html`.

Vercel AI SDK is capable, but its broader provider/UI surface is unnecessary for this template. The small interface allows a backend adapter for OpenAI, Claude, Gemini, DeepSeek or a custom gateway without changing the Vue page. Provider credentials must stay server-side.

Shiki was not added: basic code blocks satisfy the reference page and keep its lazy chunk small. A product needing syntax highlighting can dynamically import Shiki on code-containing messages.

## Using the companion AI service

Source repositories:

- [vue-h5-template-ai-service](https://github.com/fonghehe/vue-h5-template-ai-service) — AI streaming service (port 8001)
- [vue-h5-template-business-service](https://github.com/fonghehe/vue-h5-template-business-service) — Business API service (port 8002)

For clone commands and setup, see [Backend Modes](../essentials/server.md).

Start `vue-h5-template-ai-service` on port `8001` with its default `AI_PROVIDER=mock`, then run `pnpm dev:services:vant`. The Vite proxy forwards `/api/ai/chat` without buffering the response, and `FetchChatProvider` adds the current business-service bearer token when the user is signed in. This also supports the AI service's optional `AI_AUTH_REQUIRED=true` mode when both backend services share the same JWT settings.

To use a real model, configure `AI_PROVIDER=openai-compatible`, `AI_BASE_URL`, `AI_API_KEY` and `AI_MODEL` in the **AI service**, never in an app `VITE_*` variable. The browser contract remains unchanged.
