# Adding a Feature

1. Add a framework-neutral page in `packages/mobile-ui/src`; add lazy wrappers and explicit routes in all three apps. Keep native-only UI in its app.

2. Add English, Chinese and Japanese message keys and a translated `meta.title`. Use canonical paths for shared links; preserve each app's theme and safe-area layout.

3. Update `openapi/schema.yaml`, generate types, add a module under `packages/api-client/src/modules`, and implement the Mock handler. Use Query for remote data and Pinia only for client-owned state.

4. Cover behavior with unit/component tests and shared Playwright cases; run `pnpm check` and relevant E2E. Check shared packages independently, not only through app imports.

5. Update all five documentation locales, and add a changeset for public-package changes. Follow root `AGENTS.md`.

Start from the real catalog (`CatalogPage.vue` + `queries.ts`) or request example. Do not copy the old `res.code`/`res.data` examples or persist server lists in an order store.

```vue
<!-- apps/h5-*/src/views/list/index.vue -->
<script setup lang="ts">
import CatalogPage from '@vh5/mobile-ui/CatalogPage.vue';
</script>

<template>
  <CatalogPage />
</template>
```
