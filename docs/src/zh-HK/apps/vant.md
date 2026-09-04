# Vant

三個應用統一 Home/List/Member/Examples，路徑係 `/home`、`/list`、`/member`、`/examples`。業務頁來自 `packages/mobile-ui`，原生導覽同 `/examples/components` 保留應用實作。預設英文，Member 可切換中日文。AI 浮動按鈕打開 `/ai/chat`，喺 Member/Chat/Login/Cart/Payment/Details 隱藏。

Vant 4 用 `VantResolver` 按需載入，唔做全域註冊或者全量 CSS。頂欄藍色 `#1989fa` 配白色標題同返回圖示，用元件變數避免 root 樣式覆蓋。導覽係 `van-nav-bar` / `van-tabbar`，登入用可測試 LoginForm，商品列表係共享頁面。

```bash
pnpm dev:vant
pnpm dev:services:vant
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

Port: `5778`.

[後端模式](../guide/essentials/server.md) · [主題](../guide/essentials/styles.md) · [路由行為](../guide/essentials/route.md)
