# Introduction

Vue H5 Template is a pnpm + Turborepo mobile Vue monorepo. Five separately built apps share real product views through `packages/mobile-ui`, while native navigation and component showcases remain framework-specific. Each production app uses one UI framework.

Current features: English-first Chinese/Japanese switching; themed headers and floating AI entry; product catalog/details and local cart; typed Axios/OpenAPI contracts; TanStack Query pagination/mutation/load-more; fetch/SSE chat with stop and safe Markdown; SVG icons, mobile browser API examples, optional PWA and production image optimization.

| Technology | Role |
| --- | --- |
| Vue 3 / Vue Router | UI and navigation |
| TypeScript / Vite / UnoCSS | Types, build and styles |
| Pinia / TanStack Vue Query | Client state and server cache |
| Axios / OpenAPI / Nitro | REST transport, types and Mock API |
| Oxlint / ESLint / Stylelint / Oxfmt | Lint and formatting |
| Vitest / Playwright | Unit, component and browser tests |

Dependency ranges are centralized in the catalog in `pnpm-workspace.yaml`. Resolved versions are recorded in `pnpm-lock.yaml`. See [Quick Start](./quick-start.md) for the supported Node.js and pnpm versions.

Routes are handwritten. UnoCSS supplements scoped CSS rather than replacing it. PWA/debug tools are optional; SSR/SSG, production upload workflows, automatic refresh-token rotation and role authorization across every app are not complete template features. See [migration and roadmap](../v2/migration-v2.md).
