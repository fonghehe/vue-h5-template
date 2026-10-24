# TDesign Mobile Vue

应用在 `src/layout/index.vue` 中使用 `tdesign-mobile-vue` 的 `Navbar` 和 `TabBar`，由 bootstrap 导入 TDesign 样式。蓝色主题（`#0052d9`）定义在 `src/theme.css`。

首页、列表、会员和示例使用 `packages/mobile-ui` 的共享页面。打开**示例 → 组件展示**（`/examples/components`）查看框架专属控件。

## 本地运行

开发端口为 **5783**。`dev:tdesign` 使用 Nitro Mock，启动两个配套服务后可切换到 `dev:services:tdesign`。生产产物位于 `apps/h5-tdesign/dist`。

```bash
pnpm dev:tdesign
pnpm dev:services:tdesign
pnpm build:tdesign
pnpm -F @vh5/h5-tdesign preview
```

[后端模式](../guide/essentials/server.md) · [路由](../guide/essentials/route.md) · [测试](../guide/v2/testing.md)
