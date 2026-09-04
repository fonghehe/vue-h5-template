# System Architecture

```text
App route → shared mobile page → Query → api-client (Axios) → Nitro / business service
App route → shared ChatPage → useStreamingChat → FetchChatProvider → Nitro / AI service
bootstrap → i18n → Pinia → configureApiClient → VueQueryPlugin → router → mount
```

Three apps share product behavior but keep independent native navigation, themes, locale adapters and session integration. `packages/mobile-ui` owns presentation and its Query/cart logic; `api-client` owns REST contracts; `ai-chat` owns streaming. App `views` are lazy wrappers, not three duplicated business implementations.

Pinia is for client state; TanStack Query caches remote data; Vue I18n owns language. The cart is local and checkout is a demo, not a payment integration. The same REST/SSE contracts work with Nitro Mock or the companion business/AI services.

Routes are explicit. All apps centralize HTTP 401 handling; only Vant currently evaluates `requiresAuth` metadata. Role metadata alone is not enforcement. See [routing limitations](../essentials/route.md).

Vite 8 uses Rolldown. UI resolvers load the selected library on demand; UnoCSS complements scoped CSS. Shared responsive pages bypass px-to-vw conversion. App namespaces separate persisted store keys, but current user/cart stores explicitly use localStorage even in production.

`pnpm check` runs lint, recursive type checks, Vitest and workspace builds; Playwright is separate. Changesets manages version/release automation. See [directory map](./dir.md), [backend modes](../essentials/server.md), [testing](../v2/testing.md) and [v2 boundaries](../v2/architecture.md).
