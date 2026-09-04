# Vant

三個應用統一 Home/List/Member/Examples，路徑為 `/home`、`/list`、`/member`、`/examples`。業務頁來自 `packages/mobile-ui`，原生導覽與 `/examples/components` 保留應用實作。預設英文，Home/Member 可切換中日文。AI 浮動按鈕開啟 `/ai/chat`，在 Chat/Login/Cart/Details 隱藏。

Vant 4 使用 `VantResolver` 按需載入，不做全域註冊或全量 CSS。頂欄藍色 `#1989fa` 搭配白色標題及返回圖示，以元件變數防止根層樣式覆蓋。導覽為 `van-nav-bar` / `van-tabbar`，登入使用可測試 LoginForm，商品列表為共享頁面。

```bash
pnpm dev:vant
pnpm dev:services:vant
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

Port: `5778`.

[後端模式](../guide/essentials/server.md) · [主題](../guide/essentials/styles.md) · [路由行為](../guide/essentials/route.md)
