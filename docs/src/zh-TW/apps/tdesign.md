# TDesign Mobile Vue

應用在 `src/layout/index.vue` 使用 `tdesign-mobile-vue` 的 `Navbar` 和 `TabBar`，由 bootstrap 匯入 TDesign 樣式。藍色主題（`#0052d9`）定義於 `src/theme.css`。

首頁、清單、會員及範例使用 `packages/mobile-ui` 的共用頁面。開啟**範例 → 元件展示**（`/examples/components`）查看框架專屬控制項。

## 在本機執行

開發連接埠為 **5783**。`dev:tdesign` 使用 Nitro Mock，啟動兩個配套服務後可改用 `dev:services:tdesign`。正式建置輸出至 `apps/h5-tdesign/dist`。

```bash
pnpm dev:tdesign
pnpm dev:services:tdesign
pnpm build:tdesign
pnpm -F @vh5/h5-tdesign preview
```

[後端模式](../guide/essentials/server.md) · [路由](../guide/essentials/route.md) · [測試](../guide/v2/testing.md)
