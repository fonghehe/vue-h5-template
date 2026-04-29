<div align="center">

<h1>Vue H5 Template</h1>

Mobile H5 development template based on Vue 3 + TypeScript + Turborepo

English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md) | [繁體中文(台)](./README.zh-TW.md) | [繁體中文(港)](./README.zh-HK.md)

</div>

## Introduction

Vue H5 Template is a free and open-source mobile H5 development template built on Turborepo Monorepo architecture, using the latest Vue 3, Vite, TypeScript, and other mainstream technology stacks. It provides H5 app templates for three UI frameworks: NutUI, Vant, and Varlet.

## Features

- **Monorepo Architecture** — Managed with Turborepo + pnpm workspace for multiple H5 apps and shared packages
- **Three UI Frameworks** — NutUI, Vant, and Varlet versions available for flexible UI choices
- **TypeScript** — Full TypeScript support with type-safe file-based routing (unplugin-vue-router)
- **Vite Build** — Vite-based build configuration with auto-import and component auto-registration
- **UnoCSS** — Atomic CSS engine for utility-first styling across all apps
- **State Management** — Pinia with persistence plugin, AES encryption in production
- **Mock Server** — Nitro-based mock backend with authentication and product APIs
- **Eruda** — Built-in mobile debugging console (non-production only)
- **Unified Standards** — Shared ESLint / Prettier / Stylelint / Commitlint configurations
- **Mobile Adaptation** — postcss-mobile-forever for responsive viewport adaptation (375px design, 600px max)
- **Internationalization** — Supports Simplified Chinese, Traditional Chinese, English, and Japanese

## Tech Stack

| Technology          | Version | Description                  |
| ------------------- | ------- | ---------------------------- |
| Vue 3               | 3.5     | Frontend framework           |
| TypeScript          | 6.0     | Type safety                  |
| Vite                | 8.0     | Build tool                   |
| UnoCSS              | 66.x    | Atomic CSS engine            |
| Turborepo           | 2.9     | Monorepo management          |
| pnpm                | 10.27   | Package manager              |
| Pinia               | 3.0     | State management             |
| Vue Router          | 5.0     | Routing                      |
| unplugin-vue-router | 0.19    | Type-safe file-based routing |
| Vue I18n            | 11.3    | Internationalization         |
| Nitro               | 2.x     | Mock server                  |
| NutUI               | 4.3     | UI component library         |
| Vant                | 4.9     | UI component library         |
| Varlet              | 3.12    | UI component library         |
| VueUse              | 14.x    | Composition utilities        |
| Eruda               | 3.x     | Mobile debug console         |

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.12.0
- [pnpm](https://pnpm.io/) >= 10.0.0
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
│   ├── lint-configs/       # ESLint, Stylelint, Commitlint configs
│   ├── node-utils/         # Node.js utilities
│   ├── tsconfig/           # Shared TypeScript configs
│   └── vite-config/        # Shared Vite configuration
├── packages/
│   ├── @core/              # Core packages (base, composables, preferences)
│   ├── locales/            # i18n locale messages
│   ├── stores/             # Pinia stores
│   ├── styles/             # Shared styles
│   └── utils/              # Shared utilities
└── scripts/                # Build scripts and CLI tools
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

Supports modern browsers and mobile browsers. IE is not supported.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge ≥ 80                                                                                                                                                                                              | Firefox ≥ 78                                                                                                                                                                                                      | Chrome ≥ 80                                                                                                                                                                                                   | Safari ≥ 14                                                                                                                                                                                                   |

## Contributing

Contributions are welcome! Please refer to the [Contributing Guide](https://github.com/fonghehe/vue-h5-template/blob/main/CONTRIBUTING.md).

Git commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## License

[MIT](./LICENSE)
