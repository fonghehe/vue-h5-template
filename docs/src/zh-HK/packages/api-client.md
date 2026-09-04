# @vh5/api-client

共享 typed Axios REST client，bootstrap 統一設定。函式直接回傳 data，UI 處理 `ApiError`，唔解析 envelope。

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[參考: API](../guide/essentials/api.md) · [參考: Mock / services](../guide/essentials/server.md)
