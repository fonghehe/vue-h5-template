# 样式

## 全局样式

`packages/styles` 提供全局基础样式和各 UI 库的样式入口：

```ts
import "@vh5/styles/global"; // 全局基础样式（CSS Reset + 公共组件样式）
import "@vh5/styles/nutui"; // NutUI 主题样式（可选）
import "@vh5/styles/vant"; // Vant 主题样式（可选）
import "@vh5/styles/varlet"; // Varlet 主题样式（可选）
```

所有应用在 `bootstrap.ts` 中统一引入 `@vh5/styles/global`。

## 按需加载策略

三个应用均采用按需加载，策略略有差异：

### Vant

- **组件 JS + CSS**：通过 `VantResolver({ importStyle: true })`（默认值）完全按需加载，无需 `app.use(Vant)` 全量注册
- **不额外导入** `vant/lib/index.css`，由 Resolver 统一管理每个组件的 CSS 注入顺序

> **为什么不能同时导入 `vant/lib/index.css` 和使用 Resolver 按需注入？**
> 全量 CSS 和按需 CSS 会导致同一组件的样式被注入两次，且第二次（按需）的 Popup CSS 顺序排在 Toast CSS 之后，造成白色背景覆盖深色 Toast 背景。
> 正确做法：只用 Resolver 按需注入，不额外引入全量 CSS。

```ts
// bootstrap.ts（vant）
import "@vh5/styles/global";
// ✅ 不导入 vant/lib/index.css，组件 CSS 由 VantResolver 按需注入
// ❌ 不使用 app.use(Vant) 全量注册
```

### Varlet

- **组件 JS + CSS**：通过 `VarletImportResolver` 完全按需加载，模板中使用的组件自动注入对应 CSS
- **Snackbar（函数式）**：在使用 Snackbar 的文件中手动导入 CSS 依赖链

```ts
// 在使用 Snackbar 的组件文件中
import { Snackbar } from "@varlet/ui";
import "@varlet/ui/es/snackbar/style/index.mjs"; // 手动导入 Snackbar CSS
```

### NutUI

- **组件 JS + CSS**：通过 `NutUIResolver` 完全按需加载
- **函数式组件**（Toast/Notify/Dialog/ImagePreview）：在 `bootstrap.ts` 中手动导入 CSS

```ts
// bootstrap.ts（nutui）
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## NutUI SCSS 变量

NutUI 版通过 Vite SCSS 配置函数式注入全局变量，仅作用于 app 自身的 SCSS 文件：

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

## 移动端适配

使用 `postcss-px-to-viewport-8-plugin` 将 px 自动转换为 viewport 单位：

- 设计稿宽度：375px
- 转换规则：`1px → 0.2667vw`

## BEM 命名

样式采用 BEM 命名规范，基于 `@vh5-core/design` 设计 Token。
