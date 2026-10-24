# Ionic Vue

`src/bootstrap.ts` 注册 `IonicVue` 并加载 Ionic 基础样式。`src/App.vue` 使用 `IonApp`，布局使用 `IonToolbar` 和 `IonFooter`，页面由工作区的 Vue Router 管理。蓝色主题（`#0054e9`）定义在 `src/theme.css`。

首页、列表、会员和示例使用 `packages/mobile-ui` 的共享页面。打开**示例 → 组件展示**（`/examples/components`）查看框架专属控件。

## 本地运行

开发端口为 **5784**。`dev:ionic` 使用 Nitro Mock，启动两个配套服务后可切换到 `dev:services:ionic`。生产产物位于 `apps/h5-ionic/dist`。

```bash
pnpm dev:ionic
pnpm dev:services:ionic
pnpm build:ionic
pnpm -F @vh5/h5-ionic preview
```

[后端模式](../guide/essentials/server.md) · [路由](../guide/essentials/route.md) · [测试](../guide/v2/testing.md)
