# 目录结构

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

共享业务页放 `packages/mobile-ui/src`，各应用只写懒加载路由包装；框架专属登录和组件示例留在应用。会话 store 位于 Vant/Varlet 的 `stores/user.ts`、NutUI 的 `store/modules/user.ts`。

接口函数和生成类型归 `api-client`，协议和会话生命周期归 `ai-chat`。浏览器生命周期工具放 `packages/@core/composables`，不要塞进巨型页面 composable。

共享包通过 workspace 直接导出 `.vue`/`.ts`。新增包后 install，导出变化后重启开发服务。构建配置使用编译产物，修改后执行 `pnpm -F @vh5/vite-config stub`。

改边界前参见[路由](../essentials/route.md)、[架构](./architecture.md)和根 `AGENTS.md`。
