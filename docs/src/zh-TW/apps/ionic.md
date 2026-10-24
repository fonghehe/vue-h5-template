# Ionic Vue

`src/bootstrap.ts` 註冊 `IonicVue` 並載入 Ionic 基礎樣式。`src/App.vue` 使用 `IonApp`，版面使用 `IonToolbar` 和 `IonFooter`，頁面由工作區的 Vue Router 管理。藍色主題（`#0054e9`）定義於 `src/theme.css`。

首頁、清單、會員及範例使用 `packages/mobile-ui` 的共用頁面。開啟**範例 → 元件展示**（`/examples/components`）查看框架專屬控制項。

## 在本機執行

開發連接埠為 **5784**。`dev:ionic` 使用 Nitro Mock，啟動兩個配套服務後可改用 `dev:services:ionic`。正式建置輸出至 `apps/h5-ionic/dist`。

```bash
pnpm dev:ionic
pnpm dev:services:ionic
pnpm build:ionic
pnpm -F @vh5/h5-ionic preview
```

[後端模式](../guide/essentials/server.md) · [路由](../guide/essentials/route.md) · [測試](../guide/v2/testing.md)
