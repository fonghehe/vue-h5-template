# 新增功能

1. 共用頁放 `packages/mobile-ui/src`，三應用加 lazy 包裝同顯式路由；原生 UI 留應用。

2. 同步英中日文案、`meta.title`，保持標準路徑、主題同 safe area。

3. 更新 OpenAPI 再生成型別，API 放 `packages/api-client/src/modules`，補 Mock。遠端資料用 Query，client state 用 Pinia。

4. 加 unit/component/共享 E2E，跑 check 同相關 E2E，獨立檢查共享包。

5. 同步五語 docs、公開包 changeset，跟 `AGENTS.md`。

參考 `CatalogPage.vue`、`queries.ts`，唔好再用舊 `res.code`/`res.data` 或持久化 server list 嘅 Pinia 示例。

```vue
<!-- apps/h5-*/src/views/list/index.vue -->
<script setup lang="ts">
import CatalogPage from '@vh5/mobile-ui/CatalogPage.vue';
</script>

<template>
  <CatalogPage />
</template>
```
