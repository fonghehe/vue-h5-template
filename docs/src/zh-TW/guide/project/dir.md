# 目錄結構

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

共享業務頁放 `packages/mobile-ui/src`，應用提供延遲路由包裝；框架專屬登入及元件示例留在應用。工作階段 store 在 Vant/Varlet 的 `stores/user.ts`、NutUI 的 `store/modules/user.ts`。

接口與生成型別歸 `api-client`，串流與生命週期歸 `ai-chat`，瀏覽器工具歸 `packages/@core/composables`，不要集中成巨型 composable。

workspace 直接公開 `.vue`/`.ts`。新增套件後 install，exports 變更後重啟。構建設定需執行 `pnpm -F @vh5/vite-config stub` 更新編譯產物。

參見[路由](../essentials/route.md)、[架構](./architecture.md)及根 `AGENTS.md`。
