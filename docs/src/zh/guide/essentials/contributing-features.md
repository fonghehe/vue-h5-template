# 新增特性

特性（Feature）是一个自包含的业务逻辑切片，位于 `packages/features/<name>` 独立包中，将视图、Composable、Store 和路由模块打包在一起。

## 1. 文件夹规范

```
packages/features/<name>/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                # 公共入口：重新导出路由 + Store
│   ├── routes.ts               # RouteRecordRaw[]
│   ├── store.ts                # Pinia Store（可选）
│   ├── composables/
│   │   └── use-<name>.ts
│   ├── views/
│   │   ├── List.vue
│   │   └── Detail.vue
│   ├── components/             # 特性私有组件
│   └── locales/
│       ├── zh-CN.json
│       └── en-US.json
```

包名为 `@vh5/feature-<name>`。

## 2. 操作步骤

### 第一步 — 脚手架

```bash
# 复制现有特性包，然后：
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

```ts
// packages/services/src/product.service.ts
export const ProductService = {
  getList: (...) => productApi.list(...).then(({ items }) => items.map(toProduct)),
  getDetail: (id) => productApi.detail(id).then(toProduct),
}
```

### 第三步 — Composable

```ts
// packages/features/product/src/composables/use-product-detail.ts
export function useProductDetail(id: MaybeRef<number>) {
  /* … */
}
```

### 第四步 — 视图

```vue
<!-- packages/features/product/src/views/Detail.vue -->
<script setup lang="ts">
import { useProductDetail } from "../composables/use-product-detail";

const route = useRoute();
const { data, loading, error } = useProductDetail(() => Number(route.query.id));
</script>

<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :error="error" />
  <article v-else-if="data">
    <img :src="data.imgUrl" />
    <h1>{{ data.title }}</h1>
    <p>¥{{ data.price }}</p>
  </article>
</template>
```

使用 `@vh5/app-shell/ui` 中的 **`<AppButton>`、`<AppCell>`、`<AppToast>`** 等适配器组件，而非直接引入 `nut-button` / `van-button` / `var-button`——否则会将特性与某个应用强绑定。

### 第五步 — 路由模块

```ts
// packages/features/product/src/routes.ts
import type { RouteRecordRaw } from "vue-router";

export const productRoutes: RouteRecordRaw[] = [
  {
    path: "/product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: { title: "商品列表", authority: ["user", "admin"] },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("./views/Detail.vue"),
    meta: { title: "商品详情", authority: ["user", "admin"] },
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

### 第七步 — 注册到应用外壳

```ts
// packages/app-shell/src/router/index.ts
import { productRoutes } from "@vh5/feature-product";
import { authRoutes } from "@vh5/feature-auth";
import { userRoutes } from "@vh5/feature-user";
import { mergeRouteModules } from "@vh5/utils";

export const routes = mergeRouteModules([...authRoutes, ...productRoutes, ...userRoutes]);
```

每个适配应用都已挂载共享外壳，无需每个应用单独配置。

## 3. 检查清单

- [ ] 不引用其他特性包（`@vh5/feature-*`）
- [ ] 不直接调用 `fetch` / `axios`——通过 `@vh5/services`
- [ ] 不引入组件库组件（`nut-*`、`van-*`、`var-*`）
- [ ] 视图通过 Composable 获取服务端数据，不通过 Pinia
- [ ] 路由声明了 `meta.title` 和 `meta.authority`
- [ ] 语言字符串与特性放在一起
- [ ] 为 Service / Composable 编写单元测试
