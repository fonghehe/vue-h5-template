# TDesign Mobile Vue

應用喺 `src/layout/index.vue` 用 `tdesign-mobile-vue` 嘅 `Navbar` 同 `TabBar`，由 bootstrap 載入 TDesign 樣式。藍色主題（`#0052d9`）喺 `src/theme.css` 定義。

首頁、列表、會員同示例用 `packages/mobile-ui` 嘅共用頁面。打開**示例 → 元件展示**（`/examples/components`）睇框架專屬控制項。

## 喺本機執行

開發連接埠係 **5783**。`dev:tdesign` 用 Nitro Mock，啟動兩個配套服務後可以改用 `dev:services:tdesign`。正式構建輸出喺 `apps/h5-tdesign/dist`。

```bash
pnpm dev:tdesign
pnpm dev:services:tdesign
pnpm build:tdesign
pnpm -F @vh5/h5-tdesign preview
```

[後端模式](../guide/essentials/server.md) · [路由](../guide/essentials/route.md) · [測試](../guide/v2/testing.md)
