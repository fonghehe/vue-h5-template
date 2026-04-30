# 路由与导航

路由由**特性包**管理，而非各应用。应用外壳将每个特性的 `routes` 导出组合成一个路由实例。

## 1. 路由实例

`@vh5/app-shell` 统一创建路由，适配应用无需配置路由。

```ts
// packages/app-shell/src/router/index.ts
import { mergeRouteModules } from "@vh5/utils";
import { authRoutes } from "@vh5/feature-auth";
import { homeRoutes } from "@vh5/feature-home";
import { productRoutes } from "@vh5/feature-product";
import { userRoutes } from "@vh5/feature-user";

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

## 2. 特性路由模块

```ts
// packages/features/product/src/routes.ts
export const productRoutes: RouteRecordRaw[] = [
  {
    path: "product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: { title: "商品列表", authority: ["user", "admin"], tab: true },
  },
  {
    path: "product/:id",
    name: "product-detail",
    component: () => import("./views/Detail.vue"),
    meta: { title: "商品详情", authority: ["user", "admin"] },
  },
];
```

`meta` 字段说明：

| 字段        | 类型       | 说明                                    |
| ----------- | ---------- | --------------------------------------- |
| `title`     | `string`   | 文档标题 + 导航栏标题                   |
| `authority` | `string[]` | 允许访问的角色（省略 ⇒ 已登录即可访问） |
| `public`    | `boolean`  | 无需登录即可访问                        |
| `tab`       | `boolean`  | 在底部 TabBar 显示入口                  |
| `keepAlive` | `boolean`  | 用 `<KeepAlive>` 包裹视图               |

## 3. 权限守卫

`@vh5/app-shell/router/guards.ts` 中注册的单一全局守卫：

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

## 4. 类型安全导航

`unplugin-vue-router` 生成 `types/typed-router.d.ts`，推荐使用命名导航：

```ts
router.push({ name: "product-detail", params: { id } });
```

## 5. 后端驱动路由（可选）

```ts
import { generateRoutesByBackend } from "@vh5/utils";
const routes = await generateRoutesByBackend({ fetchMenuListAsync, layoutMap, pageMap });
router.addRoute({ path: "/", component: BasicLayout, children: routes });
```

## 6. 布局与标题

`BasicLayout` 包含顶部导航栏（`meta.title`）和底部 TabBar（`meta.tab === true` 的路由）。文档标题在外壳中自动更新：

```ts
watchEffect(() => {
  const title = router.currentRoute.value.meta?.title as string | undefined;
  useTitle(title ? `${title} - Vue H5 Template` : "Vue H5 Template");
});
```
