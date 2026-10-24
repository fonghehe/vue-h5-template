# TDesign Mobile Vue

`src/layout/index.vue` では `tdesign-mobile-vue` の `Navbar` と `TabBar` を使い、bootstrap で TDesign のスタイルを読み込みます。青色のテーマ（`#0052d9`）は `src/theme.css` にあります。

Home、List、Member、Examples は `packages/mobile-ui` の共有ページです。**Examples → コンポーネント**（`/examples/components`）でフレームワーク固有の UI を確認できます。

## ローカルで実行

開発用ポートは **5783** です。`dev:tdesign` は Nitro Mock を使います。連携する 2 つのサービスを起動したら `dev:services:tdesign` を使えます。本番の出力先は `apps/h5-tdesign/dist` です。

```bash
pnpm dev:tdesign
pnpm dev:services:tdesign
pnpm build:tdesign
pnpm -F @vh5/h5-tdesign preview
```

[バックエンドモード](../guide/essentials/server.md) · [ルーティング](../guide/essentials/route.md) · [テスト](../guide/v2/testing.md)
