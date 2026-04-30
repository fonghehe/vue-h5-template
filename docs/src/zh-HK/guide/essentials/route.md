# 路由同導覽

路由由**特性套件**管理，而非各應用。應用外殼將每個特性嘅 `routes` 導出組合成一個路由實例。

## 1. 路由實例

`@vh5/app-shell` 統一創建路由，適配應用無需配置路由。

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

## 2. 特性路由模組

```ts
export const productRoutes: RouteRecordRaw[] = [
  {
    path: "product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: { title: "商品列表", authority: ["user", "admin"], tab: true },
  },
];
```

`meta` 字段說明：

| 字段        | 類型       | 說明                                    |
| ----------- | ---------- | --------------------------------------- |
| `title`     | `string`   | 文件標題 + 導航欄標題                   |
| `authority` | `string[]` | 允許訪問嘅角色（省略 ⇒ 已登錄即可訪問） |
| `public`    | `boolean`  | 唔需要登錄即可訪問                      |
| `tab`       | `boolean`  | 喺底部 TabBar 顯示入口                  |
| `keepAlive` | `boolean`  | 用 `<KeepAlive>` 包裹視圖               |

## 3. 權限守衛

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

## 4. 動態標題

```ts
watchEffect(() => {
  const title = router.currentRoute.value.meta?.title as string | undefined;
  useTitle(title ? `${title} - Vue H5 Template` : "Vue H5 Template");
});
```

```ts
watchEffect(() => {
  const routeTitle = router.currentRoute.value.meta?.title;
  useTitle(routeTitle ? `${routeTitle} - Vue H5 Template` : "Vue H5 Template");
});
```
