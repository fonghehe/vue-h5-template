# HTTP & API Layer

REST requests use Axios through `packages/api-client`. App `src/api` modules re-export the shared endpoints for compatibility; do not create another fetch wrapper in each app.

## Public contract

The wire format is `ApiResponse<T>`: `{ code, message, data, error? }`. Success uses `code: 0`; endpoint functions return **unwrapped data**. Product lists return `PaginationResponse<ProductItem>` with `items, page, pageSize, total, hasMore`, not an array.

```ts
import { getProductList, loginApi, isApiError } from '@vh5/api-client';

const session = await loginApi({ username: 'user', password: '123456' });
const products = await getProductList({ page: 1, pageSize: 4 });
console.log(session.accessToken, products.items, products.hasMore);

try {
  await getProductList({ page: 2 });
} catch (error: unknown) {
  if (isApiError(error)) console.error(error.kind, error.message);
}
```

Use Query hooks from `@vh5/mobile-ui/queries` for product pages, caching and pagination. The request example page demonstrates direct calls, not a second server-state store.

## Bootstrap and errors

Each app calls `configureApiClient` once: API base URL, current token, current locale and the centralized HTTP 401 callback. Requests include Bearer auth when signed in, `Accept-Language` and an optional `X-Request-ID`. Default timeout is 15 seconds and credentials are enabled.

`ApiError.kind` is `business | configuration | http | network | timeout | unauthorized | unknown`. HTTP 401 clears the session and redirects to login; a business error code in an HTTP 200 response is not the same path. Automatic token refresh is **not implemented**. Endpoint URLs must be relative to the configured API base.

## Add an endpoint

1. Update `openapi/schema.yaml` and run `pnpm api:generate`.
2. Add the typed function to `packages/api-client/src/modules` and export it.
3. Add the Nitro handler and behavioral tests.
4. Add a Query hook when caching or mutations are required.

Generated declarations provide compile-time contracts, not runtime schema validation. Streaming uses fetch in `@vh5/ai-chat`, separately from Axios. See [Request architecture](../v2/request.md) and [Backend modes](./server.md).
