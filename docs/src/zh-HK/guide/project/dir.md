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

共享業務頁放 `packages/mobile-ui/src`，應用提供 lazy route 包裝；框架專屬登入同元件示例留喺應用。Session store 喺 Vant/Varlet 嘅 `stores/user.ts`、NutUI 嘅 `store/modules/user.ts`。

接口同生成型別歸 `api-client`，串流同生命週期歸 `ai-chat`，瀏覽器工具歸 `packages/@core/composables`，唔好集中成巨型 composable。

workspace 直接公開 `.vue`/`.ts`。新增套件後 install，exports 變更後重啟。構建設定要執行 `pnpm -F @vh5/vite-config stub` 更新編譯產物。

參見[路由](../essentials/route.md)、[架構](./architecture.md)同根 `AGENTS.md`。
