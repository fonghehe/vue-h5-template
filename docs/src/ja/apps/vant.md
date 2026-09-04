# Vant

3 アプリ共通の Home/List/Member/Examples は `/home`、`/list`、`/member`、`/examples` です。業務画面は `packages/mobile-ui`、ネイティブナビと `/examples/components` はアプリ固有です。英語既定で Member に中日切替があります。テーマ付き AI ボタンは `/ai/chat` を開き、Member/Chat/Login/Cart/Payment/Details では隠れます。

Vant 4 は `VantResolver` で必要な JS/CSS を読み込みます。全登録や全 CSS は不要です。青 `#1989fa` のヘッダーと白いタイトル/戻るアイコンはコンポーネント変数で固定し、root 既定値の上書きを防ぎます。ナビは `van-nav-bar` / `van-tabbar`、ログインはテスト可能な LoginForm、商品一覧は共有画面です。

```bash
pnpm dev:vant
pnpm dev:services:vant
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

Port: `5778`.

[バックエンドモード](../guide/essentials/server.md) · [テーマ](../guide/essentials/styles.md) · [ルート動作](../guide/essentials/route.md)
