# 新增特性

特性（Feature）是一個自包含的業務邏輯切片，位於 `packages/features/<name>` 獨立套件中，將視圖、Composable、Store 與路由模組打包在一起。

## 1. 資料夾規範

```
packages/features/<name>/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                # 公共入口：重新匯出路由 + Store
│   ├── routes.ts               # RouteRecordRaw[]
│   ├── store.ts                # Pinia Store（可選）
│   ├── composables/
│   ├── views/
│   ├── components/             # 特性私有元件
│   └── locales/
│       ├── zh-TW.json
│       └── en-US.json
```

套件名為 `@vh5/feature-<name>`。

## 2. 操作步驟

### 第一步 — 建立腳手架

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

### 第二步 — 新增 API + Service

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

在視圖中使用 `@vh5/app-shell/ui` 的適配器元件（`<AppButton>`、`<AppCell>` 等），不要直接引入 `nut-button` / `van-button` / `var-button`。

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

### 第六步 — 公開入口

```ts
// packages/features/product/src/index.ts
export { productRoutes } from "./routes";
export { useProductStore } from "./store";
export * from "./composables/use-product-detail";
```

### 第七步 — 註冊到應用外殼

```ts
// packages/app-shell/src/router/index.ts
import { productRoutes } from "@vh5/feature-product";
import { mergeRouteModules } from "@vh5/utils";

export const routes = mergeRouteModules([...authRoutes, ...productRoutes, ...userRoutes]);
```

每個適配應用都已掛載共享外殼，無需每個應用單獨設定。

## 3. 檢查清單

- [ ] 不引用其他特性套件（`@vh5/feature-*`）
- [ ] 不直接呼叫 `fetch` / `axios`——透過 `@vh5/services`
- [ ] 不引入元件庫元件（`nut-*`、`van-*`、`var-*`）
- [ ] 視圖透過 Composable 取得伺服器資料，不透過 Pinia
- [ ] 路由宣告了 `meta.title` 與 `meta.authority`
- [ ] 語言字串與特性放在一起
- [ ] 為 Service / Composable 撰寫單元測試
