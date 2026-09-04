# テスト

## 型チェックと開発サーバー

`pnpm typecheck` はアプリに加えて `mobile-ui`、`api-client`、`ai-chat`、`vite-config` を個別に検証します。Vant はアプリと `tsconfig.node.json` の両方をチェックします。アプリだけの検証では共有パッケージの型拡張の不足を見逃す場合があります。個別実行には `pnpm -F @vh5/h5-vant type-check` と `pnpm -F @vh5/mobile-ui type-check` を使います。

workspace パッケージの追加や exports の変更後は `pnpm install` を実行し、開発サーバーを再起動してください。Vant はポート使用中に別ポートへ移動せずエラーになります。古いサーバーで `Failed to resolve import @vh5/mobile-ui/...` が出た場合、そのサーバーを停止して `pnpm dev:vant` を再実行し、ブラウザを再読み込みしてください。E2E は各ルートへの直接アクセスでモジュールの HTTP エラーと未捕捉のブラウザ例外も検証します。

`pnpm test:e2e` は Vant、NutUI、Varlet で共通テストを順番に実行します。タブ機能、英中日の切り替えと保存、320px のタッチ領域、AI ボタン、Query のページ分割・更新、ログイン、Mock API、401 を検証します。ポートは 15778/15777/15779 で、Nitro API の起動を待ちます。単体実行には `pnpm test:e2e:nutui` または `pnpm test:e2e:varlet` を使います。

Vitest + happy-dom で utility/request/store/composable、Vue Test Utils で Login Form と Chat Input、Playwright で Home/Login/Mock API/401/SSE を検証します。

`pnpm check` は lint、typecheck、unit test、build を実行します。`pnpm test:e2e` はブラウザとローカルサーバーが必要なため分離し、CI では quality job の後に実行します。
Network、Visual Viewport、Pull-to-refresh のライフサイクルと、カートの数量・選択・合計、アプリケーションエラーバウンダリをテストします。
