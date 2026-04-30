# System Architecture

This document describes the production-grade target architecture of `vue-h5-template`.
It is the **single source of truth** for how the system is layered, how modules
interact, and how data flows through the application.

## 1. Goals

- **One business codebase, three UI skins.** NutUI / Vant / Varlet apps share
  100% of business logic, routing, stores and views; only the UI adapter layer
  differs.
- **Strict layering.** UI ⇢ Composables ⇢ Services ⇢ HTTP ⇢ API. Each layer
  has a single responsibility and only depends downward.
- **Domain-feature folders.** Code is organized by _feature_ (auth, product,
  user, …), not by file type (`api/`, `store/`, `views/`).
- **Type-safe at every boundary.** API DTOs, domain models, route names and
  i18n keys are all typed.

## 2. Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  UI Adapter Layer                        │  ← apps/h5-{nutui,vant,varlet}
│   • Component-library bindings (NutBtn / VanBtn / …)     │
│   • Library-specific theme & locale wiring               │
│   • Vite + UnoCSS preset for the library                 │
└────────────────────────┬────────────────────────────────┘
                         │ depends on
┌────────────────────────▼────────────────────────────────┐
│                  Application Shell                       │  ← packages/app-shell
│   • Bootstrap (createApp, plugins, mount)                │
│   • Global error boundary, loading, progress bar         │
│   • Layout (BasicLayout: navbar + tabbar)                │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  Feature Modules                         │  ← packages/features/*
│   features/auth         features/product   features/user│
│   ├ views/              ├ views/           ├ views/      │
│   ├ composables/        ├ composables/     ├ composables│
│   ├ store.ts            ├ store.ts         ├ store.ts    │
│   └ index.ts (route)    └ index.ts         └ index.ts    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  Domain Services                         │  ← packages/services
│   • AuthService, ProductService, UserService             │
│   • Pure functions: API DTO → Domain Model               │
│   • No Vue / Pinia imports                               │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  HTTP Client                             │  ← packages/request
│   • Typed `request<T>()` wrapper around fetch            │
│   • Interceptors: auth header, refresh-token, errors     │
│   • Cancellation, retry, timeout                         │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  API SDK                                 │  ← packages/api
│   • Pure endpoint definitions (no UI / store imports)    │
│   • DTO types co-located with endpoint                   │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP
┌────────────────────────▼────────────────────────────────┐
│              Backend (Mock or Real)                      │  ← apps/backend-mock
│   • Nitro + JWT, REST under /api/**                      │
└──────────────────────────────────────────────────────────┘
```

Dependency rule: a layer **may import only from layers below it**. Sideways
imports between feature modules are forbidden — they must go through services
or shared primitives in `@core/*`.

## 3. Module Responsibilities

| Layer             | Package                                           | Owns                                                              | May Import                                         |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------- |
| UI Adapter        | `apps/h5-nutui`, `apps/h5-vant`, `apps/h5-varlet` | UI-library glue, app entry, theming                               | app-shell, features, @core, services, request, api |
| Application Shell | `@vh5/app-shell`                                  | bootstrap, layout, router instance, global guards, error boundary | features, services, request, @core                 |
| Features          | `@vh5/feature-*`                                  | views, route module, feature store, feature composables           | services, @core, locales, request types            |
| Services          | `@vh5/services`                                   | domain models, transforms, business rules                         | api, @core/base                                    |
| HTTP              | `@vh5/request`                                    | typed fetch wrapper, interceptors, error mapping                  | @core/base                                         |
| API SDK           | `@vh5/api`                                        | endpoint URLs, request/response DTOs                              | @core/base (types only)                            |
| Core base         | `@vh5/core-base`                                  | tree/date/dom utils, cache, constants, `to()`                     | (none — pure)                                      |
| Composables       | `@vh5/composables`                                | framework-agnostic Vue composables                                | @core/base                                         |
| Stores            | `@vh5/stores`                                     | Pinia setup + persistence plugin                                  | @core/base                                         |
| Locales           | `@vh5/locales`                                    | i18n setup, shared strings                                        | @core/base                                         |
| Styles            | `@vh5/styles`                                     | global SCSS, design tokens, per-library overrides                 | (none)                                             |

## 4. Data Flow

### 4.1 Read flow (e.g. product detail)

```
View (ProductDetail.vue)
  └─ useProductDetail(id)            ← composable (features/product)
       └─ ProductService.getDetail   ← service: maps DTO → Product domain
            └─ api.product.detail    ← endpoint definition
                 └─ request.get      ← HTTP layer (auth, retry, errors)
                      └─ fetch        ← network
```

The view is declarative and never touches `fetch` or the API SDK directly.

### 4.2 Write flow (e.g. login)

```
LoginView
  └─ authStore.login(credentials)
       └─ AuthService.login(credentials)
            └─ api.auth.login(payload)
                 └─ request.post
       └─ on success: authStore.setSession(token, user)
       └─ router.replace(redirectTo)
```

Side effects (token persistence, redirect, toast) are owned by the feature
store, not the view.

## 5. Routing

- **Static base routes** are defined once in `@vh5/app-shell/router/base.ts`
  (login, 404, 403).
- **Each feature contributes a route module** by exporting
  `routes: RouteRecordRaw[]` from its package entry, which is merged via
  `mergeRouteModules()` from `@vh5/utils`.
- **Permission filtering** runs in a single global `beforeEach` guard:
  1. Resolve session from `authStore`.
  2. If unauthenticated and route is private → redirect `/login?redirect=…`.
  3. Run `generateRoutesByFrontend(routes, roles)` to filter by
     `meta.authority`.
- **Backend-driven routes** (optional) are supported by
  `generateRoutesByBackend()` — apps that opt in fetch a menu tree, which is
  converted to `RouteRecordRaw[]` via the same helper.

`unplugin-vue-router` continues to provide typed route names; feature views
register `<route>` blocks for their `meta`.

## 6. State Management

Three clearly separated tiers:

| Tier                | Where                        | Persisted? | Example                           |
| ------------------- | ---------------------------- | ---------- | --------------------------------- |
| **Server cache**    | composable + `useAsyncState` | no         | product list, product detail      |
| **Session state**   | `useAuthStore` (feature)     | yes (AES)  | access token, current user, roles |
| **App preferences** | `useAppStore` (app-shell)    | yes        | locale, theme, last visited tab   |

Rules:

- A view **never** stores server data in Pinia; it uses a composable
  (`useProductDetail`) that owns loading / error / data refs.
- Pinia stores hold only data that must outlive a view or be shared across
  views.
- All persisted stores go through `@vh5/stores` which transparently swaps to
  `secure-ls` (AES + compression) in production.

## 7. HTTP Layer

`@vh5/request` exports a single `request` object:

```ts
import { request } from "@vh5/request";

const data = await request.get<Product>("/api/product/detail", { params: { id } });
```

Built-in:

- `Authorization: Bearer <token>` header injection from `authStore`.
- Refresh-token flow on `401` (single-flight).
- Normalised error: every failure throws a `RequestError` with `code`,
  `message`, `httpStatus`, `payload`.
- Cancellation via `AbortController` (composables wire it to `onScopeDispose`).
- Per-call `silent`, `retry`, `timeout` options.

The API SDK (`@vh5/api`) only declares endpoints — it never owns interceptors
or auth state.

## 8. Internationalisation

- Shared strings (`common.*`, `validation.*`, `error.*`) live in
  `@vh5/locales`.
- Feature-specific strings live next to the feature
  (`packages/features/product/locales/zh-CN.json`) and are auto-merged at
  bootstrap via `import.meta.glob`.
- Per-app UI-library locales (NutUI / Vant / Varlet) are installed by the
  app's adapter, not by features.

## 9. Error Handling

- **HTTP errors** are normalised in `@vh5/request` and surfaced as
  `RequestError`.
- **Service errors** wrap recoverable business failures (e.g.
  `InvalidCredentialsError`).
- **View layer** uses the `to()` utility for non-throwing flows and a global
  `<ErrorBoundary>` (in `@vh5/app-shell`) for unexpected crashes.
- **Global toast adapter** is provided per UI library so `request` can call
  `toast.error()` without coupling to a specific component library.

## 10. Build & Tooling

- **Turborepo** orchestrates `build`, `dev`, `lint`, `typecheck` with the
  cross-app dependency graph from `pnpm-workspace.yaml`.
- **`@vh5/vite-config`** exposes `defineConfig({ application: { uiLibrary } })`;
  the adapter app is the only place a UI library is named.
- **`pnpm` catalog** centralises every third-party version.
- **`@vh5/tsconfig`** exposes `web-app.json` (apps), `library.json` (packages),
  `node.json` (scripts/internal). Every package extends one of them.

## 11. Quality Gates

- ESLint + OxLint + Stylelint + Prettier run via `lefthook` pre-commit and
  `turbo lint` in CI.
- `vitest` lives next to the code it tests; `@vh5/core-base` and
  `@vh5/services` target ≥80% line coverage.
- `circular-dependency-scanner` runs in CI to enforce the layering rule from
  §2.

See also:

- [Directory Structure](./dir.md) — concrete folder layout
- [Routing](../essentials/route.md)
- [HTTP & API](../essentials/api.md)
- [State Management](../essentials/state.md)
- [Adding a Feature](../essentials/contributing-features.md)
