# 樣式與行動主題

每個應用只載入 `@vh5/styles/global` 及一個主題入口（vant / nutui / varlet）。token 在 `packages/styles/src/<ui>/index.css`：Vant 藍 `#1989fa`、NutUI 紅 `#fa2c19`、Varlet 紫 `#6750a4`。

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

Vant 變數定義於元件，避免延遲載入的根層 CSS 覆蓋主題。頂欄跟隨 `--app-primary`，標題、返回圖示與文字操作白色。UI 按需載入；NutUI 函數式元件樣式在 bootstrap 匯入，SCSS 注入限應用檔案。

共享 CSS 在 `packages/mobile-ui/src/surface.css` 及 scoped SFC，保障 320px 網格、換行與 44px 觸控區。共享包排除 px-to-vw，其餘按 375px 設計、600px 最大展示寬度。

UnoCSS 位於 `internal/vite-config/src/plugins/unocss.ts`，不是根設定。使用 presetUno/attributify/icons，Varlet 才載入專屬 preset。shortcuts 為 `mobile-card`、`page-shell`、`tap-target`；rules 為 `safe-area-pt/pb/px`、`h-safe-screen`；斷點 375/600/768px。複雜樣式用 scoped CSS。

構建設定修改後執行 `pnpm -F @vh5/vite-config stub`。共享 SVG 在 `packages/mobile-ui/src/assets/icons`，Vant 保留自有圖示。參見[UI 策略](../v2/ui-framework.md)。
