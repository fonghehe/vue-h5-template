# Vue H5 Template

A mobile web starter with Vue 3, TypeScript and Turborepo.

English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md) | [繁體中文（台）](./README.zh-TW.md) | [繁體中文（港）](./README.zh-HK.md)

## What’s included

Vant, NutUI, Varlet, TDesign Mobile Vue and Ionic Vue are five separately built apps. They share Home, List, Member and Examples, plus product details, favorites, a persisted cart and demo checkout. Navigation, themes and component showcases belong to each app.

- **Data and routing**. Explicit lazy routes, OpenAPI-generated types and a shared Axios client. TanStack Vue Query manages remote data. Pinia manages the session and local cart.
- **Streaming chat**. An SSE client with cancellation, retry, regeneration and sanitized Markdown. The companion backend owns model provider configuration and credentials.
- **Mobile browser patterns**. Safe areas, keyboard-aware chat input, pull-to-refresh, offline feedback and an optional PWA.
- **Languages**. The app starts in English and switches between English, Simplified Chinese and Japanese from Member. The documentation is available in five locales.

## Start locally

Use **Node.js 24.x**, and **pnpm 12 or later**. The root manifest pins the pnpm version.

```bash
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template
pnpm install
```

Pick one app. `pnpm dev` offers interactive package selection.

```bash
pnpm dev:vant    # 5778
pnpm dev:nutui   # 5777
pnpm dev:varlet  # 5779
pnpm dev:tdesign # 5783
pnpm dev:ionic   # 5784
```

The development command starts or reuses Nitro on port **5320**. Its demo accounts are `user / 123456` and `admin / 123456`. To use the separate business service (8002) and AI service (8001), start both first and run `pnpm dev:services:<ui>`.

## Build and verify

| Task | Command |
| --- | --- |
| Development docs | `pnpm dev:docs` |
| App build | `pnpm build:vant` / `pnpm build:nutui` / `pnpm build:varlet` / `pnpm build:tdesign` / `pnpm build:ionic` |
| Workspace build / docs only | `pnpm build` / `pnpm build:docs` |
| Lint, types, unit tests and build | `pnpm check` |
| Browser tests for all five apps | `pnpm test:e2e` |
| Regenerate API types | `pnpm api:generate` |

App builds go to `apps/h5-<ui>/dist` and target Chrome/Android WebView 111+ and Safari/iOS WebView 16.4+. Production hosting needs an SPA fallback and routes for both backends.

## Repository layout

| Path | Responsibility |
| --- | --- |
| `apps/h5-{vant,nutui,varlet,tdesign,ionic}` | App shells, route tables and native UI adapters |
| `packages/mobile-ui` | Shared product pages and query hooks |
| `packages/{api-client,ai-chat}` | REST contracts and the streaming client |
| `packages/{locales,stores,styles}` | Shared messages, client stores and theme styles |
| `apps/backend-mock` | Development-only Nitro fixtures |
| `internal` | Shared build, lint and TypeScript configuration |
| `openapi`, `e2e`, `docs` | API schema, browser tests and documentation |

## Guide

[Online docs](https://fonghehe.github.io/vue-h5-template/) · [Backend modes](./docs/src/guide/essentials/server.md) · [Deployment](./docs/src/guide/essentials/build.md) · [Contributing](./CONTRIBUTING.md)

[MIT](./LICENSE)
