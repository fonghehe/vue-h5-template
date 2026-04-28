# Vant 版

基于 [Vant](https://vant-ui.github.io/vant/) 4.x 的移动端 H5 应用。

## 特点

- Vant 组件**按需加载**，通过 `VantResolver` 自动注册，无需 `app.use(Vant)`
- CSS 全量加载（`vant/lib/index.css`），确保 Toast/Dialog 等函数式组件样式顺序正确
- 内置 `showToast`、`showDialog` 等 API 式调用

## 运行

```bash
pnpm dev:vant
```

默认端口：`5778`

## 按需加载说明

```ts
// bootstrap.ts
// ✅ 只引入全局基础样式，vant 组件 CSS 由 VantResolver 按需注入
import "@vh5/styles/global";
// ❌ 不使用 app.use(Vant) 全量注册
// ❌ 不额外导入 vant/lib/index.css（避免与 Resolver 按需注入冲突）
```

`VantResolver` 使用默认 `importStyle: true`，在组件被使用时自动注入对应 CSS，保证样式加载顺序正确。

## 使用的 Vant 组件

| 组件                          | 用途              |
| ----------------------------- | ----------------- |
| `van-nav-bar`                 | 顶部导航栏        |
| `van-tabbar`                  | 底部标签栏        |
| `van-cell` / `van-cell-group` | 商品列表 / 列表项 |
| `van-swipe`                   | 轮播图            |
| `van-form` / `van-field`      | 登录表单          |
| `van-image`                   | 图片展示          |
| `van-button`                  | 按钮              |
| `van-tag`                     | 标签              |
| `van-empty`                   | 空状态            |
| `van-back-top`                | 返回顶部          |
| `showToast`                   | 消息提示（API）   |
| `showDialog`                  | 对话框（API）     |
