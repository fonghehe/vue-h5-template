# Routing

## Route Configuration

Routes are defined in each app's `src/router/` directory. The layout uses a tabbar-based navigation with four main tabs: Home, List, Mine, and Example.

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
  useTitle(routeTitle ? `${routeTitle} - Vue H5 Template` : 'Vue H5 Template');
});
```
