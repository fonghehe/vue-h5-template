# Migrating from v1 to v2

## Breaking changes

- REST functions return unwrapped data instead of `ApiResponse<T>`.
- `loginApi` accepts `{ username, password }`.
- product list responses are always `PaginationResponse<ProductItem>`.
- `fetchUserInfoApi` reads the token from the centralized interceptor.
- runtime routes remain handwritten; obsolete generated file-router integration is removed.
- builds target Safari 16.4+ and Chrome 111+.
- Node 22.18+/24 and pnpm 11 are required.

## Migration order

1. Copy the v2 workspace/build configuration and install with pnpm.
2. Replace local fetch wrappers with `@vh5/api-client` modules.
3. Update pages from `response.data` to direct typed values.
4. Keep client state in Pinia; move remote lists and mutations to Vue Query.
5. Add translated route titles and any required auth guards; metadata alone is insufficient.
6. Regenerate types from the backend OpenAPI schema.
7. Review PWA, browser target and storage/security decisions for your product.
8. Run `pnpm check` and the Playwright suite.

## Capability priorities

- **P0 implemented:** auth/HTTP 401, permission metadata types, typed API errors, lazy routes, safe Markdown, XSS/open-redirect controls, network state, safe area, CI, dependency lock and tests.
- **P1 roadmap:** feature flags, dark-mode switching, error reporting, analytics consent, upload/image preview, virtual list, WebView bridge and performance monitoring.
- **P2 optional:** camera/QR/deep links/native bridge, CDN strategy, SSR/SSG and product-specific SEO. These should be added only when a real deployment requires them.

## Current implementation boundaries

All apps share product tabs, themes and HTTP 401 handling. Only Vant currently evaluates `requiresAuth`; `authority` is metadata, not wired role enforcement. Product pages are uncached by default, including Cart and Query. Each layout resets `.app-content` scrolling on route changes; Pinia persistence and Query data caches are independent of KeepAlive. User/cart stores explicitly use localStorage, even in production. A frontend-only payment-method demo is available at `/payment`; real payment processing, automatic token refresh, server-synced cart and upload are not implemented. See [routing](../essentials/route.md), [state](../essentials/state.md) and [deployment](../essentials/build.md).
