# FAQ

## インストールとモジュール解決

Node 22.x の 22.18+ または 24.x、pnpm 11.10.0 を使用。workspace 変更後は `pnpm install`。旧サーバーの `Failed to resolve import @vh5/mobile-ui/...` はそのプロセスを停止し、`pnpm dev:vant` を再起動してブラウザを更新します。別ポートのテスト成功では旧サーバーは直りません。

## ポートと Mock

Vant は 5778 使用中なら失敗します。別ポートは `VITE_PORT=5788 pnpm dev:vant`。Mock 不調時は 5320 のプロセスを確認してください。プラグインは既存プロセスを置き換えません。サービスモードは 8002/8001 を別途起動し、Nitro アカウントを前提にしません。

## 白い Vant ヘッダー

`@vh5/styles/vant` を読み込み、変数を `:root` だけでなく `.van-nav-bar` に設定します。[スタイル](../essentials/styles.md)を参照。

## 型チェック

古い `pnpm check:type` ではなく `pnpm typecheck`。共有 UI/API/AI/Vite 設定を個別チェックし、Vant は app と node 設定の両方を検証。自動 import 宣言は Vite 生成、ルートは手書きです。

## 機能追加・配信

[機能ガイド](../essentials/contributing-features.md)、[バックエンド](../essentials/server.md)、[ビルド](../essentials/build.md)を確認。サブパス/PWA と旧 playground Dockerfile は環境別の確認が必要です。インストール失敗時にまず lockfile を消さないでください。
