# Ionic Vue

`src/bootstrap.ts` で `IonicVue` を登録し、Ionic の基本スタイルを読み込みます。`src/App.vue` は `IonApp`、レイアウトは `IonToolbar` と `IonFooter` を使い、画面遷移はワークスペースの Vue Router が管理します。青色のテーマ（`#0054e9`）は `src/theme.css` にあります。

Home、List、Member、Examples は `packages/mobile-ui` の共有ページです。**Examples → コンポーネント**（`/examples/components`）でフレームワーク固有の UI を確認できます。

## ローカルで実行

開発用ポートは **5784** です。`dev:ionic` は Nitro Mock を使います。連携する 2 つのサービスを起動したら `dev:services:ionic` を使えます。本番の出力先は `apps/h5-ionic/dist` です。

```bash
pnpm dev:ionic
pnpm dev:services:ionic
pnpm build:ionic
pnpm -F @vh5/h5-ionic preview
```

[バックエンドモード](../guide/essentials/server.md) · [ルーティング](../guide/essentials/route.md) · [テスト](../guide/v2/testing.md)
