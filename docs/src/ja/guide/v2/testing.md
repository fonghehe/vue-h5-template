# テスト

## 型チェックと開発サーバー

`pnpm typecheck` は 3 アプリ、共有ランタイムパッケージ（utils、stores、locales、core、UI/API/AI）、Mock バックエンド、Vite 設定、workspace CLI を個別に検証します。各アプリのソースと `tsconfig.node.json`、さらに `tsconfig.tools.json` でルートの Vitest/Playwright 設定と E2E コードも確認します。パッケージ内のテストも対象です。ソースを持つ新規パッケージには `type-check` スクリプトが必要です。個別実行は `pnpm -F @vh5/utils type-check` または `pnpm -F @vh5/mobile-ui type-check`。

workspace パッケージの追加や exports の変更後は `pnpm install` を実行し、開発サーバーを再起動してください。Vant はポート使用中に別ポートへ移動せずエラーになります。古いサーバーで `Failed to resolve import @vh5/mobile-ui/...` が出た場合、そのサーバーを停止して `pnpm dev:vant` を再実行し、ブラウザを再読み込みしてください。E2E は各ルートへの直接アクセスでモジュールの HTTP エラーと未捕捉のブラウザ例外も検証します。

`pnpm test:e2e` は Vant、NutUI、Varlet で共通テストを順番に実行します。タブ機能、英中日の切り替えと保存、320px のタッチ領域、AI ボタン、Query のページ分割・更新、ログイン、Mock API、401 を検証します。ポートは 15778/15777/15779 で、Nitro API の起動を待ちます。単体実行には `pnpm test:e2e:nutui` または `pnpm test:e2e:varlet` を使います。

Vitest + happy-dom で utility/request/store/composable、Vue Test Utils で Login Form と Chat Input、Playwright で Home/Login/Mock API/401/SSE を検証します。

`pnpm check` は lint、typecheck、unit test、build を実行します。`pnpm test:e2e` はブラウザとローカルサーバーが必要なため分離し、CI では quality job の後に実行します。
Network、Visual Viewport、Pull-to-refresh のライフサイクルと、カートの数量・選択・合計、アプリケーションエラーバウンダリをテストします。

## コアの回帰テスト

SSE の CRLF/UTF-8 分割、不正イベント、fetch ヘッダーと失敗、チャンク単位のリアクティビティ、停止・クリア・再試行の競合、Axios のタイムアウト/通信/HTTP エラー、Query ページ分割と言語別キャッシュ、カート数量・金額、セッション、更新失敗からの復帰を検証します。

`MarkdownContent` はファイル単位の `jsdom` 環境で実際の DOMPurify を使います。サニタイズをモックしたり happy-dom で安全性を判定したりしないでください。他の DOM テストは happy-dom のままです。jsdom 30.x の Node 最低要件は本プロジェクトより高いため、互換性のある 29.x を使用します。

`vitest.config.ts` はコア API/AI、utility/composable、一部のモバイルコンポーネント/store、バックエンドヘルパーを明示し、未インポートのファイルも集計します。分岐・関数・行・文の 60% 閾値はこの範囲のみで、アプリ全体のカバレッジではありません。`pnpm test:coverage` でレポート、`pnpm test packages/ai-chat/src/__tests__` で個別テストを実行します。CI の quality job でもカバレッジを検証します。
