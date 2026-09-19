# @vh5/api-client

共享型別化 Axios REST 客戶端，bootstrap 統一設定。函式直接回傳 data，UI 處理 `ApiError`，不解析 envelope。

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[參考: API](../guide/essentials/api.md) · [參考: Mock / services](../guide/essentials/server.md)

## REST 契約與請求取消

函式直接回傳解包資料，失敗時以 `ApiError` 拒絕。讀取應轉交 Query 的 `AbortSignal`；寫入使用 bootstrap 統一設定的驗證用戶端，不傳入使用者 ID。

```ts
import { getProductFavorite, setProductFavorite, getChatSuggestions } from '@vh5/api-client';

const state = await getProductFavorite(1, signal);
await setProductFavorite(1, !state.favorite);
const prompts = await getChatSuggestions('zh-TW', signal, '/api/ai');
```

用戶端將 `zh-*` 對應至 `zh-CN`、`ja-*` 對應至 `ja-JP`，其他語言使用 `en-US`。FastAPI 僅接受這三個精確值；省略時為 `en-US`，不支援的值回傳 HTTP 422。語言由 `locale` 查詢參數決定，不依賴 `Accept-Language`。

Monorepo 將 `ChatPage.endpoint` 尾端 `/chat` 移除，作為建議 API 的 base URL，並將網址與語言納入快取鍵。`VITE_AI_CHAT_ENDPOINT` 應與 AI 代理一致。JSON 放在 `@vh5/api-client`，SSE 保留在 `@vh5/ai-chat`。

[UI](./mobile-ui.md) · [Mock](../apps/backend-mock.md)
