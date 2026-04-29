# NutUI 版 H5

基於 [NutUI](https://nutui.jd.com/) 4.x 的行動端 H5 應用。

## 特點

- NutUI 元件**按需載入**（透過 `NutUIResolver` 自動註冊和注入 CSS）
- SCSS 全局變數支援（函式式注入，僅作用於應用自身檔案）
- NutUI 圖標庫 `@nutui/icons-vue`

## 啟動

```bash
pnpm dev:nutui
```

預設埠號：`5777`

## 函式元件樣式

NutUI 的 `showToast`、`showNotify`、`showDialog`、`showImagePreview` 等函式元件無法被 Resolver 自動導入樣式，需在 `bootstrap.ts` 中手動匯入：

```ts
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## SCSS 設定

NutUI 全局變數透過 Vite `additionalData` 函式式注入，僅作用於應用自身的 SCSS 檔案：

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

## 使用的 NutUI 元件

| 元件                     | 用途              |
| ------------------------ | ----------------- |
| `nut-navbar`             | 頂部導覽列        |
| `nut-tabbar`             | 底部標籤列        |
| `nut-cell`               | 商品列表 / 列表項 |
| `nut-swiper`             | 輪播圖            |
| `nut-form` / `nut-input` | 登入表單          |
| `nut-avatar`             | 使用者頭像        |
| `nut-grid`               | 宮格佈局          |
| `nut-button`             | 按鈕              |
| `showToast`              | 訊息提示（API）   |
| `showNotify`             | 通知（API）       |
| `showDialog`             | 對話框（API）     |
