# Varlet 版

基于 [Varlet](https://varlet.pages.dev/) 3.x 的移动端 H5 应用。

## 特点

- Varlet 组件 **完全按需加载**，通过 `VarletImportResolver` 自动注册和注入 CSS，无需 `app.use(Varlet)`
- Material Design 风格
- 内置 Snackbar API 式组件

## 运行

```bash
pnpm dev:varlet
```

默认端口：`5779`

## 按需加载说明

```ts
// bootstrap.ts — 无需全量注册，VarletImportResolver 自动处理
import "@vh5/styles/global";
// ❌ 不再使用 app.use(Varlet) 和全量 CSS 导入
```

Snackbar 为函数式组件，需在使用处手动导入 CSS：

```ts
import { Snackbar } from "@varlet/ui";
import "@varlet/ui/es/snackbar/style/index.mjs"; // 包含所有 Snackbar 依赖 CSS
```

## 使用的 Varlet 组件

| 组件                    | 用途              |
| ----------------------- | ----------------- |
| `var-app-bar`           | 顶部导航栏        |
| `var-bottom-navigation` | 底部标签栏        |
| `var-cell`              | 商品列表 / 列表项 |
| `var-swipe`             | 轮播图            |
| `var-input`             | 输入框            |
| `var-image`             | 图片展示          |
| `var-button`            | 按钮              |
| `var-space`             | 间距布局          |
| `Snackbar`              | 消息提示（API）   |
