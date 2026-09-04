# @vh5/api-client

Shared typed Axios REST client, configured once in app bootstrap. Endpoint functions return data directly; UI code handles `ApiError`, not response envelopes.

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[Reference: API](../guide/essentials/api.md) · [Reference: Mock / services](../guide/essentials/server.md)
