# 樣式

## 全域樣式

`packages/styles` 提供全域基礎樣式和各 UI 庫的樣式入口：

```ts
import "@vh5/styles/global"; // 全域基礎樣式
import "@vh5/styles/nutui"; // NutUI 主題樣式（可選）
import "@vh5/styles/vant"; // Vant 主題樣式（可選）
import "@vh5/styles/varlet"; // Varlet 主題樣式（可選）
```

## 按需載入策略

### Vant

- `VantResolver({ importStyle: true })` 完全按需載入，無需 `app.use(Vant)`
- 不題外導入 `vant/lib/index.css`（由 Resolver 統一管理 CSS 注入順序）

```ts
// bootstrap.ts方vant）
import "@vh5/styles/global";
// ✅ 不導入 vant/lib/index.css，元件 CSS 由 VantResolver 按需注入
// ❌ 不使用 app.use(Vant) 全量註冊
```

### Varlet

- `VarletImportResolver` 完全按需載入
- **Snackbar（函式）**：在使用 Snackbar 的檔案中手動導入 CSS

```ts
import { Snackbar } from "@varlet/ui";
import "@varlet/ui/es/snackbar/style/index.mjs";
```

### NutUI

- `NutUIResolver` 完全按需載入
- **函式元件**（Toast/Notify/Dialog/ImagePreview）：在 `bootstrap.ts` 手動導入 CSS

```ts
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## 行動端適配

使用 `postcss-mobile-forever` 將 px 自動轉換為 viewport 單位：

- 設計稿寬度：375px
- 最大顯示寬度：600px（平板等大螢幕自動居中限寬）

## UnoCSS

專案使用 [UnoCSS](https://unocss.dev/) 作為原子化 CSS 引擎，設定檔案位於專案根目錄 `uno.config.ts`。

### 內置快捷方式

| 快捷方式          | 等價於                                      |
| ----------------- | ------------------------------------------- |
| `flex-center`     | `flex items-center justify-center`          |
| `flex-between`    | `flex items-center justify-between`         |
| `flex-col-center` | `flex flex-col items-center justify-center` |

### 使用示例

```vue
<template>
  <div class="flex-center h-full text-lg text-gray-600">Hello UnoCSS</div>
</template>
```

支援 attributify 模式：

```vue
<div flex items-center justify-center text-lg>
  Hello UnoCSS
</div>
```

## BEM 命名

樣式採用 BEM 命名規範，基於 `@vh5-core/design` 設計 Token。
