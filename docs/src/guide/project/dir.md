# Project Structure

The repository is a Turborepo + pnpm monorepo organised by **layer** and
**feature**. See [System Architecture](./architecture.md) for the layering
rules.

## 1. Top Level

```
vue-h5-template/
├── apps/                # Runtime applications (UI adapters + backend mock)
├── packages/            # Reusable libraries, organised by layer
├── internal/            # Build-time tooling (configs, lint, ts, vite)
├── scripts/             # CLI utilities (turbo-run, vsh, code generators)
└── docs/                # VitePress documentation
```

## 2. `apps/` — UI Adapter Layer

Each H5 app is a thin shell over `@vh5/app-shell`. Its only job is to wire one
UI component library and that library's locale / theme.

```
apps/
├── h5-nutui/            # NutUI adapter            (port 5777)
├── h5-vant/             # Vant adapter             (port 5778)
├── h5-varlet/           # Varlet adapter           (port 5779)
└── backend-mock/        # Nitro mock server        (port 5320)
```

A typical adapter app contains:

```
apps/h5-nutui/
├── index.html
├── vite.config.ts       # defineConfig({ application: { uiLibrary: 'nut' } })
├── package.json
└── src/
    ├── main.ts          # Imports @vh5/app-shell, registers UI adapter
    ├── ui-adapter.ts    # Maps generic <AppButton> → <nut-button>, etc.
    └── styles.scss      # Library-specific theme overrides only
```

Adapter apps **must not** contain views, stores, API calls, or routes — those
live in features and the shell.

## 3. `packages/` — Layered Libraries

```
packages/
├── @core/
│   ├── base/            # @vh5/core-base    — pure utils (tree, date, to, …)
│   └── composables/     # @vh5/composables  — framework-agnostic Vue composables
│
├── api/                 # @vh5/api          — endpoint + DTO declarations
├── request/             # @vh5/request      — typed fetch client + interceptors
├── services/            # @vh5/services     — domain models & business rules
│
├── stores/              # @vh5/stores       — Pinia setup + persistence
├── locales/             # @vh5/locales      — i18n setup + shared strings
├── styles/              # @vh5/styles       — global CSS & design tokens
├── utils/               # @vh5/utils        — route helpers (frontend/backend)
│
├── app-shell/           # @vh5/app-shell    — bootstrap, layout, router, guards
│
└── features/            # Domain features (one folder = one feature)
    ├── auth/            # @vh5/feature-auth     login, logout, refresh, guard
    ├── user/            # @vh5/feature-user     profile, account
    ├── product/         # @vh5/feature-product  list, detail
    └── home/            # @vh5/feature-home     landing page
```

Layering rule (enforced by lint): a package may import only from packages
above it in the table in [Architecture §3](./architecture.md).

### A Feature Package

```
packages/features/product/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts         # public entry — re-exports routes + store
    ├── routes.ts        # RouteRecordRaw[]
    ├── store.ts         # optional Pinia store
    ├── composables/
    ├── views/
    ├── components/      # feature-private
    └── locales/
        ├── zh-CN.json
        └── en-US.json
```

See [Adding a Feature](../essentials/contributing-features.md).

## 4. `apps/backend-mock/` — Mock Server

```
apps/backend-mock/
├── nitro.config.ts
├── api/
│   ├── auth/{login,logout,refresh}.post.ts
│   ├── user/info.get.ts
│   └── product/{list,detail}.get.ts
├── middleware/1.api.ts  # CORS
├── routes/[...].ts      # 404 fallback
└── utils/
    ├── jwt-utils.ts
    ├── cookie-utils.ts
    ├── mock-data.ts
    └── response.ts      # useResponseSuccess / useResponseError
```

## 5. `internal/` — Build Tooling

```
internal/
├── tsconfig/            # @vh5/tsconfig         base / web-app / library / node
├── vite-config/         # @vh5/vite-config      defineConfig() factory
├── node-utils/          # @vh5/node-utils       fs, git, monorepo helpers
└── lint-configs/
    ├── eslint-config/
    ├── oxlint-config/
    ├── oxfmt-config/
    ├── prettier-config/
    ├── stylelint-config/
    ├── commitlint-config/
    └── lint-staged-config/
```

## 6. `scripts/`

```
scripts/
├── turbo-run/           # interactive `pnpm dev` selector
├── vsh/                 # `pnpm create-app` + scaffolding
├── deploy/              # Dockerfile + nginx.conf
└── clean.mjs            # cross-package cleanup
```

## 7. Path Aliases

Inside an adapter app:

| Alias    | Resolves to         | Use for                    |
| -------- | ------------------- | -------------------------- |
| `@/`     | `apps/<app>/src/`   | Adapter-specific code only |
| `#/`     | `apps/<app>/types/` | App-local types            |
| `@vh5/*` | workspace package   | Everything else            |

In features and packages there is no `@/` alias — packages import other
packages by name (`@vh5/...`) only.

## 8. Where Things Live (Cheat Sheet)

| I want to add…                    | Put it in…                                                      |
| --------------------------------- | --------------------------------------------------------------- |
| A new page                        | `packages/features/<feature>/src/views/`                        |
| A new API endpoint                | `packages/api/src/<domain>.ts` + `services/<domain>.service.ts` |
| A new Pinia store                 | `packages/features/<feature>/src/store.ts`                      |
| A new shared composable           | `packages/@core/composables/src/`                               |
| A new shared utility              | `packages/@core/base/shared/src/utils/`                         |
| A new locale string               | `packages/features/<feature>/src/locales/<lang>.json`           |
| A new global style / design token | `packages/styles/src/global/`                                   |
| A new build plugin                | `internal/vite-config/src/plugins/`                             |
| A new UI-library adapter app      | `apps/h5-<lib>/` + register in `pnpm-workspace.yaml`            |
