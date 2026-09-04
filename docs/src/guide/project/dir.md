# Directory Structure

```text
apps/h5-{vant,nutui,varlet}/src/
  bootstrap.ts
  router/index.ts
  layout/index.vue
  views/                    → @vh5/mobile-ui/*.vue
  locales/index.ts
  api/                      → @vh5/api-client
packages/
  mobile-ui/src/             → pages, cart.ts, queries.ts, surface.css
  api-client/src/modules/    → auth.ts, user.ts, product.ts
  api-client/src/generated/  → schema.d.ts
  ai-chat/src/               → fetch-provider.ts, sse.ts, use-streaming-chat.ts
  locales/src/langs/         → en-US, zh-CN, ja-JP, legacy zh-TW
  stores/ styles/ utils/ @core/
internal/                   → vite-config, tsconfig, lint-configs, node-utils
apps/backend-mock/api/
openapi/schema.yaml
e2e/
docs/src/                   → English; zh/, ja/, zh-TW/, zh-HK/
```

Place shared product pages in `packages/mobile-ui/src`, with lazy route wrappers in every app. Framework-specific login and UI showcases remain in the apps. Session stores are under `stores/user.ts` for Vant/Varlet and `store/modules/user.ts` for NutUI.

Endpoint functions and generated API types belong to `api-client`; protocols and conversation lifecycle belong to `ai-chat`. Add browser lifecycle helpers to `packages/@core/composables`, not to a giant page composable.

Source-consumed packages export their `.vue`/`.ts` files via workspace dependencies. Run `pnpm install` after adding a package, and restart dev servers after export changes. Build config exports compiled output; rebuild it with `pnpm -F @vh5/vite-config stub`.

See [routes](../essentials/route.md), [architecture](./architecture.md), and root `AGENTS.md` before changing module boundaries.
