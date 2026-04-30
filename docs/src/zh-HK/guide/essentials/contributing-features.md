# 新增特性

特性（Feature）係一個自包含嘅業務邏輯切片，位於 `packages/features/<name>` 獨立套件中，將視圖、Composable、Store 同路由模組打包喺一齊。

## 1. 文件夾規範

```
packages/features/<name>/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                # 公共入口：重新導出路由 + Store
│   ├── routes.ts               # RouteRecordRaw[]
│   ├── store.ts                # Pinia Store（可選）
│   ├── composables/
│   ├── views/
│   ├── components/             # 特性私有組件
│   └── locales/
│       ├── zh-CN.json
│       └── en-US.json
```

套件名為 `@vh5/feature-<name>`。

## 2. 操作步驟

### 第一步 — 腳手架

```bash
# 複製現有特性套件，然後：
pnpm install
```

`package.json`：

```json
{
  "name": "@vh5/feature-product",
  "version": "0.0.0",
  "private": true,
  "main": "src/index.ts",
  "dependencies": {
    "@vh5/api": "workspace:*",
    "@vh5/services": "workspace:*",
    "@vh5/core-base": "workspace:*",
    "vue": "catalog:",
    "vue-router": "catalog:",
    "pinia": "catalog:"
  }
}
```

### 第二步 — 添加 API + Service

```ts
// packages/api/src/product.ts
export const productApi = {
  list: (params) => request.get<...>('/product/list', { params }),
  detail: (id) => request.get<...>('/product/detail', { params: { id } }),
}
```

### 第三步 — Composable

```ts
// packages/features/product/src/composables/use-product-detail.ts
export function useProductDetail(id: MaybeRef<number>) {
  /* … */
}
```

### 第四步 — 視圖

喺視圖中使用 `@vh5/app-shell/ui` 嘅適配器組件（`<AppButton>`、`<AppCell>` 等），唔好直接引入 `nut-button` / `van-button` / `var-button`。

```vue
<script setup lang="ts">
const { data, loading, error } = useProductDetail(() => Number(route.query.id));
</script>

<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :error="error" />
  <article v-else-if="data">
    <h1>{{ data.title }}</h1>
    <p>¥{{ data.price }}</p>
  </article>
</template>
```

### 第五步 — 路由模組

```ts
export const productRoutes: RouteRecordRaw[] = [
  {
    path: "/product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: { title: "商品列表", authority: ["user", "admin"] },
  },
];
```

### 第六步 — 公共入口

```ts
// packages/features/product/src/index.ts
export { productRoutes } from "./routes";
export { useProductStore } from "./store";
export * from "./composables/use-product-detail";
```

### 第七步 — 注冊到應用外殼

```ts
// packages/app-shell/src/router/index.ts
import { productRoutes } from "@vh5/feature-product";
import { mergeRouteModules } from "@vh5/utils";

export const routes = mergeRouteModules([...authRoutes, ...productRoutes, ...userRoutes]);
```

每個適配應用都已掛載共享外殼，唔需每個應用單獨配置。

## 3. 檢查清單

- [ ] 唔引用其他特性套件（`@vh5/feature-*`）
- [ ] 唔直接調用 `fetch` / `axios`——通過 `@vh5/services`
- [ ] 唔引入組件庫組件（`nut-*`、`van-*`、`var-*`）
- [ ] 視圖通過 Composable 獲取服務端數據，唔通過 Pinia
- [ ] 路由聲明咗 `meta.title` 同 `meta.authority`
- [ ] 語言字串同特性放喺一齊
- [ ] 為 Service / Composable 編寫單元測試
