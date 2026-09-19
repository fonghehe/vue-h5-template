# テスト


`pnpm typecheck` は `@vh5/docs` の VitePress 設定も検査します。個別には `pnpm -F @vh5/docs type-check` を実行してください。文書のビルド成功だけでは型の正しさを確認できません。

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

## 追加機能の回帰テスト

API テストでは ID、本文、キャンセル、言語変換、AI の base URL とエラー伝播を確認します。コンポーネントテストでは未ログイン、保存・解除、取得の再試行、保存失敗、アカウント変更後の古い応答を検証します。チャットではリモート提案、ローカルへの切り替え、アンマウント時の中断を確認します。QueryClient はテストごとに作成・破棄します。

```bash
pnpm test packages/api-client/src/__tests__/features.test.ts packages/mobile-ui/src/__tests__/favorite-button.test.ts packages/mobile-ui/src/__tests__/chat-page.test.ts
pnpm test:coverage
pnpm test:e2e
```

Playwright は再読み込み後のお気に入り、解除、リモート提案、通信失敗時のローカル提案を確認します。Query の更新テストは先にログインします。ストリーミングテストは固定の質問を入力し、提案の文言に依存させません。これらは開発用 Mock の検証であり、PostgreSQL/Redis の統合テストには別の環境設定が必要です。
