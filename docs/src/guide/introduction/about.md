# Introduction

Vue H5 Template is a Vue 3 mobile H5 development template Monorepo project based on **Turborepo**.

## Features

- **Monorepo Management** — Unified management of multiple apps and shared packages with Turborepo + pnpm workspace
- **Three UI Frameworks** — NutUI, Vant, and Varlet versions available
- **TypeScript** — Full TypeScript support with type-safe file-based routing (unplugin-vue-router)
- **Vite** — Vite 8-based build with auto-import and component auto-registration
- **UnoCSS** — Atomic CSS engine for utility-first styling, replacing traditional CSS class names
- **Pinia** — State management with persistence (AES encryption in production)
- **Mock Backend** — Nitro-based mock server with auth and product APIs
- **Eruda** — Built-in mobile debugging console (non-production only)
- **Unified Standards** — Shared ESLint / Prettier / Stylelint / Commitlint configs
- **Dynamic Title** — Auto-update page title on route change
- **Mobile Adaptation** — postcss-mobile-forever for responsive viewport adaptation with max-width limiting
- **Internationalization** — Supports Simplified Chinese, Traditional Chinese, English, and Japanese

## Tech Stack

| Technology          | Version | Description              |
| ------------------- | ------- | ------------------------ |
| Vue 3               | 3.5     | Frontend framework       |
| TypeScript          | 6.0     | Type safety              |
| Vite                | 8.0     | Build tool               |
| UnoCSS              | 66.x    | Atomic CSS engine        |
| Turborepo           | 2.9     | Monorepo management      |
| pnpm                | 10.27   | Package manager          |
| Pinia               | 3.0     | State management         |
| Vue Router          | 5.0     | Routing                  |
| unplugin-vue-router | 0.19    | Type-safe file routing   |
| Vue I18n            | 11.3    | Internationalization     |
| Nitro               | 2.x     | Mock server              |
| NutUI               | 4.3     | UI component library     |
| Vant                | 4.9     | UI component library     |
| Varlet              | 3.12    | UI component library     |
| VueUse              | 14.x    | Composition utilities    |
| Eruda               | 3.x     | Mobile debugging console |

## Project Structure

```
vue-h5-template/
├── apps/                 # Applications
│   ├── h5-nutui/         # NutUI H5 app (port 5777)
│   ├── h5-vant/          # Vant H5 app (port 5778)
│   ├── h5-varlet/        # Varlet H5 app (port 5779)
│   └── backend-mock/     # Nitro mock backend
├── packages/             # Shared packages
│   ├── @core/            # Core (design, composables, preferences)
│   ├── locales/          # i18n locale messages
│   ├── stores/           # Pinia state management
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── internal/             # Internal config packages
│   ├── vite-config/      # Shared Vite config
│   ├── tsconfig/         # Shared TypeScript config
│   └── lint-configs/     # Shared lint configs
├── scripts/              # Build scripts
└── docs/                 # Documentation (this site)
```
