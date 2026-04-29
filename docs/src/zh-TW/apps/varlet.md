# Varlet 版 H5

基於 [Varlet](https://varlet.pages.dev/) 3.x 的行動端 H5 應用。

## 特點

- Varlet 元件**完全按需載入**，透過 `VarletImportResolver` 自動註冊和注入 CSS，無需 `app.use(Varlet)`
- Material Design 風格
- 內置 Snackbar API 式元件

## 啟動

```bash
pnpm dev:varlet
```

預設埠號：`5779`

## 按需載入說明

```ts
// bootstrap.ts — 無需全量註冊，VarletImportResolver 自動處理
import "@vh5/styles/global";
// ❌ 不再使用 app.use(Varlet) 和全量 CSS 匯入
```

## 使用的 Varlet 元件

| 元件                    | 用途              |
| ----------------------- | ----------------- |
| `var-app-bar`           | 頂部導覽列        |
| `var-bottom-navigation` | 底部標籤列        |
| `var-cell`              | 商品列表 / 列表項 |
| `var-swipe`             | 輪播圖            |
| `var-input`             | 輸入框            |
| `var-image`             | 圖片展示          |
| `var-button`            | 按鈕              |
| `var-space`             | 間距佈局          |
| `Snackbar`              | 訊息提示（API）   |
