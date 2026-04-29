# NutUI 版

基于 [NutUI](https://nutui.jd.com/) 4.x 的移动端 H5 应用。

## 特点

- NutUI 组件**按需加载**（通过 `NutUIResolver` 自动注册和注入 CSS）
- SCSS 全局变量支持（函数式注入，仅作用于 app 自身文件）
- NutUI 图标库 `@nutui/icons-vue`

## 运行

```bash
pnpm dev:nutui
```

默认端口：`5777`

## 函数式组件样式

NutUI 的 `showToast`、`showNotify`、`showDialog`、`showImagePreview` 等函数式组件无法被 Resolver 自动引入样式，需在 `bootstrap.ts` 中手动导入：

```ts
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## SCSS 配置

NutUI 全局变量通过 Vite `additionalData` 函数式注入，避免污染 `packages/styles` 等共享包：

```ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: (source: string, filename: string) => {
        if (filename.includes('/apps/h5-nutui/src/')) {
          return `@use "@nutui/nutui/dist/styles/variables.scss" as *;\n${source}`;
        }
        return source;
      },
    },
  },
}
```

## 使用的 NutUI 组件

| 组件                     | 用途              |
| ------------------------ | ----------------- |
| `nut-navbar`             | 顶部导航栏        |
| `nut-tabbar`             | 底部标签栏        |
| `nut-cell`               | 商品列表 / 列表项 |
| `nut-swiper`             | 轮播图            |
| `nut-form` / `nut-input` | 登录表单          |
| `nut-avatar`             | 用户头像          |
| `nut-grid`               | 宫格布局          |
| `nut-button`             | 按钮              |
| `showToast`              | 消息提示（API）   |
| `showNotify`             | 通知（API）       |
| `showDialog`             | 对话框（API）     |
