# Ionic Vue

`src/bootstrap.ts` 註冊 `IonicVue` 同載入 Ionic 基礎樣式。`src/App.vue` 用 `IonApp`，版面用 `IonToolbar` 同 `IonFooter`，頁面由 workspace 嘅 Vue Router 管理。藍色主題（`#0054e9`）喺 `src/theme.css` 定義。

首頁、列表、會員同示例用 `packages/mobile-ui` 嘅共用頁面。打開**示例 → 元件展示**（`/examples/components`）睇框架專屬控制項。

## 喺本機執行

開發連接埠係 **5784**。`dev:ionic` 用 Nitro Mock，啟動兩個配套服務後可以改用 `dev:services:ionic`。正式構建輸出喺 `apps/h5-ionic/dist`。

```bash
pnpm dev:ionic
pnpm dev:services:ionic
pnpm build:ionic
pnpm -F @vh5/h5-ionic preview
```

[後端模式](../guide/essentials/server.md) · [路由](../guide/essentials/route.md) · [測試](../guide/v2/testing.md)
