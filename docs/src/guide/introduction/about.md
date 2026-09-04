# Introduction

Vue H5 Template is a pnpm + Turborepo mobile Vue monorepo. Three separately built apps share real product views through `packages/mobile-ui`, while native navigation and component showcases remain framework-specific. No production app imports all three UI frameworks.

Current features: English-first Chinese/Japanese switching; themed headers and floating AI entry; product catalog/details and local cart; typed Axios/OpenAPI contracts; TanStack Query pagination/mutation/load-more; fetch/SSE chat with stop and safe Markdown; SVG icons, mobile browser API examples, optional PWA and production image optimization.

| Package | Repository catalog |
| --- | --- |
| Vue / Vue Router | 3.5 / 5.2 |
| TypeScript / Vite | 6.0 / 8.1 (Rolldown) |
| Pinia / Vue Query | 4.0 / 5.x |
| Vue I18n / UnoCSS | 11.4 / 66.x |
| Vant / NutUI / Varlet | 4.10 / 4.3 / 3.19 |
| Vitest / Playwright | 4.1 / 1.62 |

These are catalog version families, not a promise of the latest upstream release; exact resolved versions are in `pnpm-lock.yaml`. Node/pnpm requirements are in [Quick Start](./quick-start.md).

Routes are handwritten. UnoCSS supplements scoped CSS rather than replacing it. PWA/debug tools are optional; SSR/SSG, production upload workflows, automatic refresh-token rotation and role authorization across every app are not complete template features. See [migration and roadmap](../v2/migration-v2.md).
