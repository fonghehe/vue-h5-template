# @vh5/api-client

Shared typed Axios REST client, configured once in app bootstrap. Endpoint functions return data directly; UI code handles `ApiError`, not response envelopes.

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[Reference: API](../guide/essentials/api.md) · [Reference: Mock / services](../guide/essentials/server.md)

## REST contracts and cancellation

These helpers return unwrapped data and reject through `ApiError`. Forward the query’s `AbortSignal` to reads. A favorite write uses the authenticated client configured at bootstrap; never send a caller-supplied owner ID.

```ts
import { getProductFavorite, setProductFavorite, getChatSuggestions } from '@vh5/api-client';

const state = await getProductFavorite(1, signal);
await setProductFavorite(1, !state.favorite);
const prompts = await getChatSuggestions('zh-TW', signal, '/api/ai');
```

The client maps `zh-*` to `zh-CN`, `ja-*` to `ja-JP`, and other languages to `en-US`. FastAPI itself only accepts those three exact values; omission defaults to `en-US`, and unsupported values return HTTP 422. The explicit `locale` query parameter selects the prompts; do not rely on `Accept-Language` alone.

The monorepo derives the suggestion base URL from `ChatPage.endpoint` by removing its trailing `/chat`. Both that URL and locale are in the query key. Configure `VITE_AI_CHAT_ENDPOINT` consistently with the AI proxy. The request belongs in `@vh5/api-client`, while SSE remains in `@vh5/ai-chat`.

[UI](./mobile-ui.md) · [Mock](../apps/backend-mock.md)
