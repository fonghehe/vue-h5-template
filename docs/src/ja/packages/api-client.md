# @vh5/api-client

bootstrap で一度設定する型付き Axios REST client。関数は data を返し、UI は envelope ではなく `ApiError` を扱います。

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[参照: API](../guide/essentials/api.md) · [参照: Mock / services](../guide/essentials/server.md)
