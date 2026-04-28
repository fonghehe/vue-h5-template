# 路由与导航

## 路由配置

每个 H5 应用的路由定义在 `src/router/` 目录下。

```ts
const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: 'home', component: () => import('@/views/home/index.vue'), meta: { title: '首页' } },
      { path: 'list', component: () => import('@/views/list/index.vue'), meta: { title: '列表' } },
      { path: 'mine', component: () => import('@/views/mine/index.vue'), meta: { title: '我的' } },
      { path: 'example', component: () => import('@/views/example/index.vue'), meta: { title: '示例' } },
    ],
  },
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/details', component: () => import('@/views/list/details/index.vue') },
];
```

## 布局

`BasicLayout` 组件包含：
- **顶部导航栏**：显示当前页面标题，非 Tab 页面显示返回按钮
- **底部 TabBar**：首页 / 列表 / 我的 / 示例
- **主内容区**：有 TabBar 时自动增加底部内边距避免遮挡

## 动态标题

通过 `@vueuse/core` 的 `useTitle` 实现页面标题自动跟随路由切换：

```ts
watchEffect(() => {
  const routeTitle = router.currentRoute.value.meta?.title;
  useTitle(routeTitle ? `${routeTitle} - Vue H5 Template` : 'Vue H5 Template');
});
```
