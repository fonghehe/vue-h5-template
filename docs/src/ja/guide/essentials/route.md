# ルーティング

ルートは各アプリではなく**特性パッケージ**が管理します。アプリケーションシェルが各特性の `routes` エクスポートを 1 つのルーターインスタンスに合成します。

## 1. ルーターインスタンス

`@vh5/app-shell` がルーターを一元作成します。アダプターアプリはルートを設定しません。

```ts
const featureRoutes = mergeRouteModules([...homeRoutes, ...productRoutes, ...userRoutes]);

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: BasicLayout, redirect: "/home", children: featureRoutes },
    ...authRoutes,
    { path: "/:pathMatch(.*)*", component: () => import("../views/NotFound.vue") },
  ],
});
```

## 2. 特性ルートモジュール

```ts
export const productRoutes: RouteRecordRaw[] = [
  {
    path: "product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: { title: "商品一覧", authority: ["user", "admin"], tab: true },
  },
];
```

`meta` フィールドの説明：

| フィールド  | 型         | 説明                                              |
| ----------- | ---------- | ------------------------------------------------- |
| `title`     | `string`   | ドキュメントタイトル + ナビバータイトル           |
| `authority` | `string[]` | アクセス可能なロール（省略 ⇒ 認証済みであれば可） |
| `public`    | `boolean`  | ログイン不要でアクセス可能                        |
| `tab`       | `boolean`  | 下部タブバーにエントリを表示                      |
| `keepAlive` | `boolean`  | `<KeepAlive>` で View をラップ                    |

## 3. 権限ガード

```ts
router.beforeEach((to) => {
  startProgress();
  if (to.meta.public) return true;
  const auth = useAuthStore();
  if (!auth.isAuthenticated) return { name: "login", query: { redirect: to.fullPath } };
  const required = to.meta.authority as string[] | undefined;
  if (required && !required.some(auth.hasRole)) return { name: "forbidden" };
  return true;
});
router.afterEach(() => stopProgress());
```

## 4. 動的タイトル

```ts
watchEffect(() => {
  const title = router.currentRoute.value.meta?.title as string | undefined;
  useTitle(title ? `${title} - Vue H5 Template` : "Vue H5 Template");
});
```
