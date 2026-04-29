# ルーティング

## ルート設定

各アプリの `src/router/` でルートを定義します：

```ts
const routes = [
  {
    path: "/",
    component: BasicLayout,
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "ホーム" },
      },
      {
        path: "list",
        component: () => import("@/views/list/index.vue"),
        meta: { title: "リスト" },
      },
      {
        path: "mine",
        component: () => import("@/views/mine/index.vue"),
        meta: { title: "マイページ" },
      },
      {
        path: "example",
        component: () => import("@/views/example/index.vue"),
        meta: { title: "サンプル" },
      },
    ],
  },
  { path: "/login", component: () => import("@/views/login/index.vue") },
  { path: "/details", component: () => import("@/views/list/details/index.vue") },
];
```

## 型安全ルーティング

[unplugin-vue-router](https://uvr.esm.is/) を統合し、`src/views/` を自動スキャンして `types/typed-router.d.ts` に型付きルート定義を生成します。`.vue` ファイルに `<route>` ブロックを追加して段階的にファイルベースルーティングを源用できます：

```vue
<route lang="yaml">
meta:
  title: ホーム
</route>
```

## レイアウト

`BasicLayout` には以下が含まれます：

- **上部ナビバー**：ページタイトル表示、非タブページでは戻るボタンを表示
- **下部タブバー**：ホーム / リスト / マイページ / サンプル
- **コンテンツエリア**：タブバー表示時に自動でパディングを追加

## 動的タイトル

`@vueuse/core` の `useTitle` でパス切り替時にページタイトルを自動更新：

```ts
watchEffect(() => {
  const routeTitle = router.currentRoute.value.meta?.title;
  useTitle(routeTitle ? `${routeTitle} - Vue H5 Template` : "Vue H5 Template");
});
```
