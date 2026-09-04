# 样式与移动主题

每个应用只加载一个主题入口：`@vh5/styles/vant`、`nutui` 或 `varlet`，加上 `@vh5/styles/global`，不要同时导入三个主题。token 位于 `packages/styles/src/<ui>/index.css`：Vant 蓝 `#1989fa`、NutUI 红 `#fa2c19`、Varlet 紫 `#6750a4`。

```ts
// Vant bootstrap; choose only the current app's theme.
import '@vh5/styles/global';
import '@vh5/styles/vant';
```

```css
/* packages/styles/src/vant/index.css */
.van-nav-bar {
  --van-nav-bar-background: var(--app-primary);
  --van-nav-bar-title-text-color: #fff;
  --van-nav-bar-icon-color: #fff;
  --van-nav-bar-text-color: #fff;
}
```

Vant 顶栏变量定义在组件上，而不只在 `:root`，避免后加载的 Vant CSS 把顶栏覆盖成白色。背景跟随 `--app-primary`，标题、返回图标、文字操作为白色。UI JS/CSS 由 resolver 按需加载；NutUI 函数式 Toast/Notify/Dialog/ImagePreview 样式在 bootstrap 显式导入，SCSS 变量注入仅限应用文件。

共享样式在 `packages/mobile-ui/src/surface.css` 和 SFC scoped CSS。响应式网格、标题换行、44px 触控区保障 320px 列表可读性。共享包排除 `postcss-mobile-forever` 转换，其他应用样式按 375px 设计宽度、600px 最大展示宽度处理。

实际 UnoCSS 配置在 `internal/vite-config/src/plugins/unocss.ts`，不是根 `uno.config.ts`。使用 presetUno、attributify、icons，Varlet 才加载对应 preset。已有 shortcuts：`mobile-card`、`page-shell`、`tap-target`；rules：`safe-area-pt`、`safe-area-pb`、`safe-area-px`、`h-safe-screen`；断点为 375/600/768px。复杂组件仍用 scoped CSS。

构建配置改动后执行 `pnpm -F @vh5/vite-config stub`。共享 SVG 资源在 `packages/mobile-ui/src/assets/icons`，Vant 还保留应用图标目录。参见[UI 策略](../v2/ui-framework.md)。
