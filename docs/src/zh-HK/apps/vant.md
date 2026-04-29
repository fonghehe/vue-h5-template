# Vant 版 H5

基於 [Vant](https://vant-ui.github.io/vant/) 4.x 的行動端 H5 應用。

## 特點

- Vant 元件**按需載入**，透過 `VantResolver` 自動註冊，無需 `app.use(Vant)`
- CSS 全量載入（`vant/lib/index.css`），確保 Toast/Dialog 等函式元件樣式順序正確
- 內置 `showToast`、`showDialog` 等 API 式呼叫

## 啟動

```bash
pnpm dev:vant
```

預設埠號：`5778`

## 按需載入說明

```ts
// bootstrap.ts
// ✅ 只導入全局基礎樣式，vant 元件 CSS 由 VantResolver 按需注入
import "@vh5/styles/global";
// ❌ 不使用 app.use(Vant) 全量註冊
// ❌ 不額外導入 vant/lib/index.css（避免與 Resolver 按需注入衝突）
```

`VantResolver` 預設使用 `importStyle: true`，在元件被使用時自動注入對應 CSS。

## 使用的 Vant 元件

| 元件                          | 用途              |
| ----------------------------- | ----------------- |
| `van-nav-bar`                 | 頂部導覽列        |
| `van-tabbar`                  | 底部標籤列        |
| `van-cell` / `van-cell-group` | 商品列表 / 列表項 |
| `van-swipe`                   | 輪播圖            |
| `van-form` / `van-field`      | 登入表單          |
| `van-image`                   | 圖片展示          |
| `van-button`                  | 按鈕              |
| `van-tag`                     | 標籤              |
| `van-empty`                   | 空狀態            |
| `van-back-top`                | 返回頂部          |
| `showToast`                   | 訊息提示（API）   |
| `showDialog`                  | 對話框（API）     |
