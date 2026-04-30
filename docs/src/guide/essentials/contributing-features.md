# Adding a Feature

A feature is a self-contained slice of business logic. It lives in its own
package under `packages/features/<name>` and bundles its views, composables,
store and route module together.

## 1. Folder Conventions

```
packages/features/<name>/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                # public entry: re-exports routes + store
│   ├── routes.ts               # RouteRecordRaw[]
│   ├── store.ts                # Pinia store (optional)
│   ├── composables/
│   │   └── use-<name>.ts
│   ├── views/
│   │   ├── List.vue
│   │   └── Detail.vue
│   ├── components/             # feature-private components
│   └── locales/
│       ├── zh-CN.json
│       └── en-US.json
```

The package name is `@vh5/feature-<name>`.

## 2. Step-by-Step

### Step 1 — Scaffold the package

```bash
pnpm --filter @vh5/feature-product run stub  # if a generator exists
# or copy an existing feature, then:
pnpm install
```

`package.json`:

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

### Step 2 — Add API + Service

If the feature talks to the backend, declare endpoints first:

```ts
// packages/api/src/product.ts
export const productApi = {
  list: (params) => request.get<...>('/product/list', { params }),
  detail: (id) => request.get<...>('/product/detail', { params: { id } }),
}
```

Then a service to map DTOs → domain:

```ts
// packages/services/src/product.service.ts
export const ProductService = {
  getList: (...) => productApi.list(...).then(({ items }) => items.map(toProduct)),
  getDetail: (id) => productApi.detail(id).then(toProduct),
}
```

### Step 3 — Composable

```ts
// packages/features/product/src/composables/use-product-detail.ts
export function useProductDetail(id: MaybeRef<number>) {
  /* … */
}
```

### Step 4 — Views

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

Use **`<AppButton>`, `<AppCell>`, `<AppToast>` adapters** from
`@vh5/app-shell/ui`. Never import `nut-button` / `van-button` / `var-button`
inside a feature — that would couple it to one app.

### Step 5 — Route Module

```ts
// packages/features/product/src/routes.ts
import type { RouteRecordRaw } from "vue-router";

export const productRoutes: RouteRecordRaw[] = [
  {
    path: "/product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: { title: "Products", authority: ["user", "admin"] },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("./views/Detail.vue"),
    meta: { title: "Detail", authority: ["user", "admin"] },
  },
];
```

### Step 6 — Public Entry

```ts
// packages/features/product/src/index.ts
export { productRoutes } from "./routes";
export { useProductStore } from "./store"; // if any
export * from "./composables/use-product-detail";
```

### Step 7 — Register in the App Shell

```ts
// packages/app-shell/src/router/index.ts
import { productRoutes } from "@vh5/feature-product";
import { authRoutes } from "@vh5/feature-auth";
import { userRoutes } from "@vh5/feature-user";
import { mergeRouteModules } from "@vh5/utils";

export const routes = mergeRouteModules([...authRoutes, ...productRoutes, ...userRoutes]);
```

Each app already mounts the shared shell; no per-app wiring required.

## 3. Checklist

- [ ] No imports from another feature (`@vh5/feature-*`)
- [ ] No direct `fetch` / `axios` calls — go through `@vh5/services`
- [ ] No UI-library component imports (`nut-*`, `van-*`, `var-*`)
- [ ] Views use composables for server data, not Pinia
- [ ] Routes declare `meta.title` and `meta.authority`
- [ ] Locale strings live next to the feature
- [ ] Unit tests for the service / composable
