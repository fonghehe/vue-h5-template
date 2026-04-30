# 特性の追加

特性（Feature）は自己完結型のビジネスロジックのスライスです。`packages/features/<name>` に独立したパッケージとして置かれ、View・Composable・Store・ルートモジュールをまとめて管理します。

## 1. フォルダ規約

```
packages/features/<name>/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                # 公開エントリ：ルート + Store を再エクスポート
│   ├── routes.ts               # RouteRecordRaw[]
│   ├── store.ts                # Pinia Store（任意）
│   ├── composables/
│   ├── views/
│   ├── components/             # 特性プライベートコンポーネント
│   └── locales/
│       ├── ja.json
│       └── en-US.json
```

パッケージ名は `@vh5/feature-<name>`。

## 2. 手順

### ステップ 1 — スキャフォールド

```bash
# 既存の特性パッケージをコピーしてから：
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

### ステップ 2 — API + Service の追加

```ts
// packages/api/src/product.ts
export const productApi = {
  list: (params) => request.get<...>('/product/list', { params }),
  detail: (id) => request.get<...>('/product/detail', { params: { id } }),
}
```

### ステップ 3 — Composable

```ts
// packages/features/product/src/composables/use-product-detail.ts
export function useProductDetail(id: MaybeRef<number>) {
  /* … */
}
```

### ステップ 4 — View

View では `@vh5/app-shell/ui` のアダプターコンポーネント（`<AppButton>`・`<AppCell>` など）を使用し、`nut-button` / `van-button` / `var-button` を直接インポートしません。

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

### ステップ 5 — ルートモジュール

```ts
export const productRoutes: RouteRecordRaw[] = [
  {
    path: "/product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: { title: "商品一覧", authority: ["user", "admin"] },
  },
];
```

### ステップ 6 — 公開エントリー

```ts
// packages/features/product/src/index.ts
export { productRoutes } from "./routes";
export { useProductStore } from "./store";
export * from "./composables/use-product-detail";
```

### ステップ 7 — アプリシェルに登録

```ts
// packages/app-shell/src/router/index.ts
import { productRoutes } from "@vh5/feature-product";
import { mergeRouteModules } from "@vh5/utils";

export const routes = mergeRouteModules([...authRoutes, ...productRoutes, ...userRoutes]);
```

各アダプターアプリは共有シェルをマウント済みです。各アプリで個別に設定する必要はありません。

## 3. チェックリスト

- [ ] 他の特性パッケージ（`@vh5/feature-*`）をインポートしていない
- [ ] `fetch` / `axios` を直接呼び出していない——`@vh5/services` 経由
- [ ] コンポーネントライブラリのコンポーネント（`nut-*`・`van-*`・`var-*`）をインポートしていない
- [ ] View でサーバーデータを取得する際は Composable を使用し Pinia を使わない
- [ ] ルートに `meta.title` と `meta.authority` が宣言されている
- [ ] ロケール文字列は特性と同じ場所に置かれている
- [ ] Service / Composable のユニットテストが書かれている
