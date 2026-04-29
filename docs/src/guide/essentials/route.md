# Routing

## Route Configuration

Routes are defined in each app's `src/router/` directory:

```ts
const routes = [
  {
    path: "/",
    component: BasicLayout,
    children: [
      { path: "home", component: () => import("@/views/home/index.vue"), meta: { title: "Home" } },
      { path: "list", component: () => import("@/views/list/index.vue"), meta: { title: "List" } },
      { path: "mine", component: () => import("@/views/mine/index.vue"), meta: { title: "Mine" } },
      {
        path: "example",
        component: () => import("@/views/example/index.vue"),
        meta: { title: "Example" },
      },
    ],
  },
  { path: "/login", component: () => import("@/views/login/index.vue") },
  { path: "/details", component: () => import("@/views/list/details/index.vue") },
];
```

## Type-safe Routing

The project integrates [unplugin-vue-router](https://uvr.esm.is/) which auto-scans `src/views/` to generate typed route definitions in `types/typed-router.d.ts`. You can gradually adopt file-based routing by adding `<route>` blocks in `.vue` files:

```vue
<route lang="yaml">
meta:
  title: Home
</route>
```

## Layout

`BasicLayout` includes:

- **Top Navbar**: Shows current page title, back button on non-tab pages
- **Bottom TabBar**: Home / List / Mine / Example
- **Content Area**: Auto padding-bottom when tabbar is visible

## Dynamic Title

Page title updates automatically on route change via `@vueuse/core`:

```ts
watchEffect(() => {
  const routeTitle = router.currentRoute.value.meta?.title;
  useTitle(routeTitle ? `${routeTitle} - Vue H5 Template` : "Vue H5 Template");
});
```
