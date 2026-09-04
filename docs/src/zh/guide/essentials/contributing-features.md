# 新增功能

1. 共享页写在 `packages/mobile-ui/src`，三个应用添加懒加载包装和显式路由；仅原生 UI 放应用内。

2. 同步英中日文案及 `meta.title` 翻译键。跨应用使用标准路径，保留各自主题和安全区。

3. 修改 `openapi/schema.yaml` 并生成类型，接口放 `packages/api-client/src/modules`，补 Mock handler。远端数据用 Query，Pinia 只管客户端状态。

4. 添加单元/组件和共享 Playwright 测试，执行 `pnpm check` 及相关 E2E。共享包需独立类型检查。

5. 同步五语文档，公开包改动补 changeset，遵循根 `AGENTS.md`。

参考现有 `CatalogPage.vue`、`queries.ts` 或 Request 示例。不要复制旧 `res.code`/`res.data` 示例，也不要把服务端订单列表持久化进 Pinia。

```vue
<!-- apps/h5-*/src/views/list/index.vue -->
<script setup lang="ts">
import CatalogPage from '@vh5/mobile-ui/CatalogPage.vue';
</script>

<template>
  <CatalogPage />
</template>
```
