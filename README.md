<div align="center">

<h1>Vue H5 Template</h1>

Mobile H5 development template based on Vue 3 + TypeScript + Turborepo

English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md) | [繁體中文(台)](./README.zh-TW.md) | [繁體中文(港)](./README.zh-HK.md)

</div>

## Consistent mobile experience

All three apps now share Home / List / Member / Examples, product details and cart, Query and request demos, and streaming chat. Native navigation and component showcases retain each framework’s identity; shared views use each app’s own theme tokens.

English is the default. Change to Chinese or Japanese from Member; the choice, document language, route titles, UI copy and Mock product language stay synchronized. The floating AI button opens Chat above the bottom tabs and hides on Member and input/checkout routes. Catalog cards preserve real 44px touch targets, including at 320px.

Both Mock and the separate AI/business services work with all three targets. Run `pnpm test:e2e` to check Vant, NutUI and Varlet. See [UI architecture](docs/src/guide/v2/ui-framework.md).

## Introduction

Vue H5 Template is a free and open-source mobile H5 development template built on Turborepo Monorepo architecture, using the latest Vue 3, Vite, TypeScript, and other mainstream technology stacks. It provides H5 app templates for three UI frameworks: NutUI, Vant, and Varlet.

## Features

- **Monorepo Architecture** — Managed with Turborepo + pnpm workspace for multiple H5 apps and shared packages
- **Three UI Frameworks** — NutUI, Vant, and Varlet versions available for flexible UI choices
- **Independent visual systems** — Coherent Vant blue, NutUI red, and Varlet purple tokens without cross-framework color leakage
- **Type-safe infrastructure** — Strict TypeScript, explicit lazy routes, OpenAPI-generated contracts, and normalized API errors
- **Streaming AI Chat** — Provider-neutral SSE/ReadableStream client with AbortController and sanitized Markdown
- **Server state** — TanStack Vue Query examples for cache, mutation, pagination, and infinite queries
- **Mobile production baseline** — Safe areas, keyboard-friendly chat input, optional PWA, and production-only image optimization
- **Product-ready mobile patterns** — Error boundary, offline status, Visual Viewport, pull-to-refresh, Web Share, clipboard, and persisted cart flow
- **Vite Build** — Vite-based build configuration with auto-import and component auto-registration
- **UnoCSS** — Atomic CSS engine for utility-first styling across all apps
- **State Management** — Pinia with persistence plugin, AES encryption in production
- **Mock Server** — Nitro-based mock backend with authentication and product APIs
- **Eruda** — Built-in mobile debugging console (non-production only)
- **Unified Standards** — Shared ESLint / OxLint / Stylelint / Oxfmt / Commitlint configurations
- **Mobile Adaptation** — postcss-mobile-forever for responsive viewport adaptation (375px design, 600px max)
- **Internationalization** — Supports Simplified Chinese, Traditional Chinese, English, and Japanese

## Tech Stack

| Technology          | Version | Description                  |
| ------------------- | ------- | ---------------------------- |
| Vue 3               | 3.5     | Frontend framework           |
| TypeScript          | 6.0     | Type safety                  |
| Vite                | 8.1     | Build tool                   |
| UnoCSS              | 66.x    | Atomic CSS engine            |
| Turborepo           | 2.10     | Monorepo management          |
| pnpm                | 11.10   | Package manager              |
| Pinia               | 4.0     | State management             |
| Vue Router          | 5.0     | Routing                      |
| TanStack Vue Query  | 5.x     | Server state and cache       |
| Axios               | 1.x     | Typed REST transport         |
| Vue I18n            | 11.4    | Internationalization         |
| Nitro               | 2.x     | Mock server                  |
| NutUI               | 4.3     | UI component library         |
| Vant                | 4.10     | UI component library         |
| Varlet              | 3.19    | UI component library         |
| VueUse              | 14.x    | Composition utilities        |
| Eruda               | 3.x     | Mobile debug console         |

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22.18.0
- [pnpm](https://pnpm.io/) >= 11.0.0
- [Git](https://git-scm.com/)

## Getting Started

```bash
# Clone the project
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# Install dependencies
pnpm install

# Start development (interactive app selection)
pnpm dev

# Start a specific app
pnpm dev:nutui    # NutUI version
pnpm dev:vant     # Vant version
pnpm dev:varlet   # Varlet version
```

Development uses the built-in Nitro mock by default. To connect the companion `vue-h5-template-business-service` (`:8002`) and `vue-h5-template-ai-service` (`:8001`), start both backends and run `pnpm dev:services:vant`, `pnpm dev:services:nutui`, or `pnpm dev:services:varlet`. See the [request architecture](https://fonghehe.github.io/vue-h5-template/guide/v2/request) for routing and environment variables.

## Build

```bash
# Build all apps
pnpm build

# Build a specific app
pnpm build:nutui
pnpm build:vant
pnpm build:varlet

# Build documentation
pnpm build:docs

# Complete quality gate (lint + types + unit tests + build)
pnpm check
pnpm test:e2e

# Regenerate API contracts / inspect bundles
pnpm api:generate
pnpm build:analyze
```

## Project Structure

```
vue-h5-template/
├── apps/
│   ├── backend-mock/       # Nitro mock server
│   ├── h5-nutui/           # NutUI H5 app (port 5777)
│   ├── h5-vant/            # Vant H5 app (port 5778)
│   └── h5-varlet/          # Varlet H5 app (port 5779)
├── docs/                   # VitePress documentation
├── internal/
│   ├── lint-configs/       # ESLint, OxLint, Stylelint, Oxfmt, Commitlint configs
│   ├── node-utils/         # Node.js utilities
│   ├── tsconfig/           # Shared TypeScript configs
│   └── vite-config/        # Shared Vite configuration
├── packages/
│   ├── @core/              # Core packages (base/shared, design, typings, composables)
│   ├── ai-chat/            # Provider-neutral streaming chat
│   ├── api-client/         # Axios client and OpenAPI-generated types
│   ├── locales/            # i18n locale messages
│   ├── stores/             # Pinia stores
│   ├── styles/             # Shared styles
│   └── utils/              # Shared utilities
├── openapi/                # Demo backend contract
├── scripts/                # Build scripts and CLI tools
└── AGENTS.md               # Architecture rules for coding agents
```

## Test Accounts

The mock server provides the following test accounts:

| Username | Password | Role         |
| -------- | -------- | ------------ |
| user     | 123456   | Regular user |
| admin    | 123456   | Admin        |

## Documentation

- [Online Documentation](https://fonghehe.github.io/vue-h5-template/)

## Browser Support

The production target is Chrome/Android WebView 111+ and Safari/iOS WebView 16.4+. Recent WeChat and WeCom WebViews on those engines are supported. IE and legacy Android WebView are not supported.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge ≥ 111 | Firefox ≥ 115 | Chrome ≥ 111 | Safari ≥ 16.4 |

## Contributing

Contributions are welcome! Please refer to the [Contributing Guide](https://github.com/fonghehe/vue-h5-template/blob/main/CONTRIBUTING.md).

Git commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## License

[MIT](./LICENSE)
