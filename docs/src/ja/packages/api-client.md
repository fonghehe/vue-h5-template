# @vh5/api-client

bootstrap で一度設定する型付き Axios REST client。関数は data を返し、UI は envelope ではなく `ApiError` を扱います。

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[参照: API](../guide/essentials/api.md) · [参照: Mock / services](../guide/essentials/server.md)

## REST 契約とキャンセル

以下の関数は包装を外したデータを返し、失敗は `ApiError` として通知します。取得には Query の `AbortSignal` を渡します。更新には起動時に設定した認証クライアントを使い、呼び出し側から所有者 ID を送信しません。

```ts
import { getProductFavorite, setProductFavorite, getChatSuggestions } from '@vh5/api-client';

const state = await getProductFavorite(1, signal);
await setProductFavorite(1, !state.favorite);
const prompts = await getChatSuggestions('zh-TW', signal, '/api/ai');
```

クライアントは `zh-*` を `zh-CN`、`ja-*` を `ja-JP`、その他を `en-US` に変換します。FastAPI が受け付けるのはこの三つの値のみです。省略時は `en-US`、未対応の値は HTTP 422 です。言語は `locale` クエリで指定し、`Accept-Language` だけには依存しません。

Monorepo では `ChatPage.endpoint` の末尾 `/chat` を除いた URL を提案用に使い、その URL と言語をキャッシュキーに含めます。`VITE_AI_CHAT_ENDPOINT` を AI プロキシに合わせて設定してください。JSON は `@vh5/api-client`、SSE は `@vh5/ai-chat` が担当します。

[UI](./mobile-ui.md) · [Mock](../apps/backend-mock.md)
