# 路由與導覽

## 路由設定

每個 H5 應用的路由定義在 `src/router/` 目錄下。

```ts
const routes = [
  {
    path: "/",
    component: BasicLayout,
    children: [
      { path: "home", component: () => import("@/views/home/index.vue"), meta: { title: "首頁" } },
      { path: "list", component: () => import("@/views/list/index.vue"), meta: { title: "列表" } },
      { path: "mine", component: () => import("@/views/mine/index.vue"), meta: { title: "我的" } },
      {
        path: "example",
        component: () => import("@/views/example/index.vue"),
        meta: { title: "範例" },
      },
    ],
  },
  { path: "/login", component: () => import("@/views/login/index.vue") },
  { path: "/details", component: () => import("@/views/list/details/index.vue") },
];
```

## 類型安全路由

專案集成了 [unplugin-vue-router](https://uvr.esm.is/)，自動掃描 `src/views/` 目錄生成類型化路由定義到 `types/typed-router.d.ts`。可以透過在 `.vue` 檔案中添加 `<route>` 塊逐步採用檔案路由：

```vue
<route lang="yaml">
meta:
  title: 首頁
</route>
```

## 版面配置

`BasicLayout` 元件包含：

- **頂部導覽列**：顯示當前頁面標題，非 Tab 頁面顯示返回按鈕
- **底部 TabBar**：首頁 / 列表 / 我的 / 範例
- **主內容區**：有 TabBar 時自動増加底部內邊距避免遠擋

## 動態標題

透過 `@vueuse/core` 的 `useTitle` 實現頁面標題自動跟隨路由切換：

```ts
watchEffect(() => {
  const routeTitle = router.currentRoute.value.meta?.title;
  useTitle(routeTitle ? `${routeTitle} - Vue H5 Template` : "Vue H5 Template");
});
```
