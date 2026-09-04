# @vh5/api-client

共享类型化 Axios REST 客户端，在 bootstrap 统一配置。接口直接返回 data，UI 处理 `ApiError`，不解析响应包装。

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[参考: API](../guide/essentials/api.md) · [参考: Mock / services](../guide/essentials/server.md)
