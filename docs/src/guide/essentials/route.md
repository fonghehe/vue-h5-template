# Routing

Routes are **owned by features**, not by apps. The application shell composes
each feature's `routes` export into a single router instance.

## 1. The Router Instance

`@vh5/app-shell` creates the router once. Adapter apps do not configure
routes.

```ts
// packages/app-shell/src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import { mergeRouteModules } from "@vh5/utils";
import { authRoutes } from "@vh5/feature-auth";
import { homeRoutes } from "@vh5/feature-home";
import { productRoutes } from "@vh5/feature-product";
import { userRoutes } from "@vh5/feature-user";
import { BasicLayout } from "../layouts/BasicLayout.vue";

const featureRoutes = mergeRouteModules([...homeRoutes, ...productRoutes, ...userRoutes]);

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: BasicLayout, children: featureRoutes },
    ...authRoutes, // /login, /forgot
    { path: "/:pathMatch(.*)*", component: () => import("../views/NotFound.vue") },
  ],
});
```

## 2. Defining a Feature's Routes

```ts
// packages/features/product/src/routes.ts
import type { RouteRecordRaw } from "vue-router";

export const productRoutes: RouteRecordRaw[] = [
  {
    path: "product",
    name: "product-list",
    component: () => import("./views/List.vue"),
    meta: {
      title: "Products",
      authority: ["user", "admin"], // role-based access
      tab: true, // show in BasicLayout tabbar
    },
  },
  {
    path: "product/:id",
    name: "product-detail",
    component: () => import("./views/Detail.vue"),
    meta: { title: "Product Detail", authority: ["user", "admin"] },
  },
];
```

`meta` keys recognised by the shell:

| Key         | Type       | Purpose                                                   |
| ----------- | ---------- | --------------------------------------------------------- |
| `title`     | `string`   | Document title + navbar title                             |
| `authority` | `string[]` | Roles allowed to access (omit ⇒ public for authenticated) |
| `public`    | `boolean`  | Accessible without login                                  |
| `tab`       | `boolean`  | Render entry in the bottom tab bar                        |
| `keepAlive` | `boolean`  | Wrap the view in `<KeepAlive>`                            |

## 3. Permission Pipeline

A single global `beforeEach` guard is registered in
`@vh5/app-shell/router/guards.ts`:

```ts
router.beforeEach(async (to) => {
  startProgress();

  if (to.meta.public) return true;

  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (Array.isArray(to.meta.authority) && !to.meta.authority.some(auth.hasRole)) {
    return { name: "forbidden" };
  }

  return true;
});

router.afterEach(() => stopProgress());
```

Frontend filtering is delegated to `generateRoutesByFrontend()` from
`@vh5/utils` for screens that show a dynamic menu (e.g. an admin section).

## 4. Type-safe Names

`unplugin-vue-router` generates `types/typed-router.d.ts`. Inside features
prefer named navigation:

```ts
router.push({ name: "product-detail", params: { id } });
```

## 5. Backend-Driven Routes (Optional)

For apps that load their menu from the server:

```ts
import { generateRoutesByBackend } from "@vh5/utils";
import { fetchMenuListAsync } from "@vh5/services";

const routes = await generateRoutesByBackend({
  fetchMenuListAsync,
  layoutMap: { BasicLayout },
  pageMap: import.meta.glob("@/features/**/views/*.vue"),
});

router.addRoute({ path: "/", component: BasicLayout, children: routes });
```

The same `meta.authority` filtering applies to backend routes.

## 6. Layout & Title

`BasicLayout` provides:

- top navbar with `meta.title`
- bottom tab bar built from routes whose `meta.tab === true`
- a slot for the active view

Document title is updated by the shell:

```ts
watchEffect(() => {
  const title = router.currentRoute.value.meta?.title as string | undefined;
  useTitle(title ? `${title} - Vue H5 Template` : "Vue H5 Template");
});
```
