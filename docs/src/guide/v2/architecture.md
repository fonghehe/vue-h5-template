# v2 Architecture

Vue H5 Template v2 is a pnpm/Turborepo monorepo with explicit product and infrastructure boundaries.

```text
apps/h5-vant ───────┐
apps/h5-nutui ──────┼── packages/api-client ── apps/backend-mock
apps/h5-varlet ─────┘
all apps ────────────── packages/mobile-ui ── packages/ai-chat ───── POST /api/ai/chat
all apps ────────────── packages/{stores,utils,styles,locales}
all builds ──────────── internal/{vite-config,lint-configs,tsconfig}
```

All three apps share the same product tabs and lazy views through `packages/mobile-ui`, while retaining independent native navigation and UI-library showcases. Each production build contains one UI framework.

## Routing decision

v2 keeps handwritten Vue Router records. The previous `unplugin-vue-router` dependency was installed but the apps still declared routes manually, creating generated types that did not describe runtime truth. Explicit routes are smaller and make layout, lazy loading, `title`, `keepAlive`, `requiresAuth` and `authority` easy to review. File routing can be reconsidered only if the app count and route volume justify its convention and generation cost.

## Runtime boundaries

- Pinia: session and other client-owned state.
- TanStack Query: remote server state.
- API client: REST transport and normalized errors.
- AI chat: stream protocol and conversation lifecycle.
- Core composables: network, Visual Viewport and pull-to-refresh lifecycle.
- SFC: rendering and local interaction only.

All three apps include an application error boundary, an offline status banner, a mobile Web API page and a persisted cart flow. These are product examples rather than new infrastructure layers: cart selection belongs to Pinia, product data remains server state, and browser lifecycle code stays in `@vh5-core/composables`.

See [Request Architecture](./request), [State Management](./state-management), and [AI Chat](./ai-chat).

## Current implementation boundaries

All apps share product tabs, themes and HTTP 401 handling. Only Vant currently evaluates `requiresAuth`; `authority` is metadata, not wired role enforcement. Product pages are uncached by default, including Cart and Query. Each layout resets `.app-content` scrolling on route changes; Pinia persistence and Query data caches are independent of KeepAlive. User/cart stores explicitly use localStorage, even in production. A frontend-only payment-method demo is available at `/payment`; real payment processing, automatic token refresh, server-synced cart and upload are not implemented. See [routing](../essentials/route.md), [state](../essentials/state.md) and [deployment](../essentials/build.md).
