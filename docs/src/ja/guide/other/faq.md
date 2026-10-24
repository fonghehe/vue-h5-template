# FAQ

## インストールとモジュール解決

Node 24.x と pnpm 12 以降を使います。workspace 変更後は `pnpm install`。旧サーバーの `Failed to resolve import @vh5/mobile-ui/...` はそのプロセスを停止し、`pnpm dev:vant` を再起動してブラウザを更新します。別ポートのテスト成功では旧サーバーは直りません。

## ポートと Mock

Vant は 5778 使用中なら失敗します。別ポートは `VITE_PORT=5788 pnpm dev:vant`。Mock 不調時は 5320 のプロセスを確認してください。プラグインは既存プロセスを置き換えません。サービスモードは 8002/8001 を別途起動し、Nitro アカウントを前提にしません。

## 白い Vant ヘッダー

`@vh5/styles/vant` を読み込み、変数を `:root` だけでなく `.van-nav-bar` に設定します。[スタイル](../essentials/styles.md)を参照。

## 型チェック

`pnpm typecheck` を使います。共有パッケージ、Mock、ツール、5 アプリのソースと `tsconfig.node.json`、ルートのテスト設定と E2E が対象です。自動 import 宣言は Vite 生成、ルートは手書きです。

## 機能追加・配信

[機能追加](../essentials/contributing-features.md)、[バックエンド](../essentials/server.md)、[デプロイ](../essentials/build.md)を参照してください。サブディレクトリに配置する場合は、本番ホストで SPA フォールバックと PWA のパスを確認します。
