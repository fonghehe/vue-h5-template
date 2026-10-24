# テスト

ルートの `vitest.config.ts` でワークスペース全体を設定します。テストは対象コードの近くに置き、ブラウザー API のモックは必要なテストスイート内で設定します。

`pnpm typecheck` は `@vh5/docs` の VitePress 設定も検査します。個別には `pnpm -F @vh5/docs type-check` を実行してください。文書のビルド成功だけでは型の正しさを確認できません。

## 型チェックと開発サーバー

`pnpm typecheck` は 5 アプリ、共有ランタイムパッケージ（utils、stores、locales、core、UI/API/AI）、Mock バックエンド、Vite 設定、workspace CLI を個別に検証します。各アプリのソースと `tsconfig.node.json`、さらに `tsconfig.tools.json` でルートの Vitest/Playwright 設定と E2E コードも確認します。パッケージ内のテストも対象です。ソースを持つ新規パッケージには `type-check` スクリプトが必要です。Turbo がこのスクリプトを実行します。個別実行は `pnpm -F @vh5/utils type-check` または `pnpm -F @vh5/mobile-ui type-check`。

workspace パッケージの追加や exports の変更後は `pnpm install` を実行し、開発サーバーを再起動してください。Vant はポート使用中に別ポートへ移動せずエラーになります。古いサーバーで `Failed to resolve import @vh5/mobile-ui/...` が出た場合、そのサーバーを停止して `pnpm dev:vant` を再実行し、ブラウザを再読み込みしてください。E2E は各ルートへの直接アクセスでモジュールの HTTP エラーと未捕捉のブラウザ例外も検証します。

`pnpm test:e2e` は次の表の順番で共通の Playwright スイートを実行します。開発モードでは Nitro の商品 API の起動を待ちます。共通タブ、言語設定の保存、商品一覧のタッチ領域、決済、AI チャット、Query、ログイン、HTTP 401 を検証します。

| アプリ | `E2E_APP` | テスト用ポート | 個別実行 |
| --- | --- | --- | --- |
| [Vant](../../apps/vant.md) | `vant` | 15778 | `pnpm exec playwright test` |
| [NutUI](../../apps/nutui.md) | `nutui` | 15777 | `pnpm test:e2e:nutui` |
| [Varlet](../../apps/varlet.md) | `varlet` | 15779 | `pnpm test:e2e:varlet` |
| [TDesign Mobile Vue](../../apps/tdesign.md) | `tdesign` | 15780 | `pnpm test:e2e:tdesign` |
| [Ionic Vue](../../apps/ionic.md) | `ionic` | 15781 | `pnpm test:e2e:ionic` |

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
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright は再読み込み後のお気に入り、解除、リモート提案、通信失敗時のローカル提案を確認します。Query の更新テストは先にログインします。ストリーミングテストは固定の質問を入力し、提案の文言に依存させません。これらは開発用 Mock の検証であり、PostgreSQL/Redis の統合テストには別の環境設定が必要です。

## ブラウザーの復旧と本番プレビュー

先に `pnpm build` で5 つのアプリをビルドします。`E2E_PREVIEW=1` では Vite preview に対してブラウザー動作テストのみを実行し、本番の Nitro Mock は無効のままです。遅延読み込みの失敗と復旧、320×640・844×390・1280×800 のレイアウト、キーボード操作、チャット表示領域の縮小と復元を検証します。必要な応答はブラウザーで傍受し、プレビューサーバーに開発用商品 API がないことも直接確認します。

```bash
E2E_APP=vant E2E_PREVIEW=1 pnpm exec playwright test
pnpm exec playwright install webkit
E2E_APP=ionic E2E_PREVIEW=1 E2E_BROWSER=webkit pnpm exec playwright test
```

`E2E_BROWSER=webkit` で WebKit を選択します。既定は Chromium です。`E2E_CHANNEL=chrome` でインストール済み Chrome を利用できます。上の表にある `E2E_APP` の値でアプリを選びます。これらはブラウザーによる模擬検証であり、実機の iOS/Android キーボード、セーフエリア、WebView の確認にはなりません。

`RouteLoadError` は描画エラーとは別に Router の読み込み失敗を処理します。イベントでアプリ側の進捗表示を停止し、現在のページを保持して失敗した遷移先へのページ再読み込みを案内します。遷移成功で通知を消し、アンマウント時に両 Router フックを解除します。

共有 Vite 設定はホストアプリから `vue-router` を一意に解決します。pnpm の peer 構成が異なると Router の注入キーが別々にバンドルされ、開発では正常でも本番の共有コンポーネントが Router を取得できない場合があります。本番プレビューでこの統合を検証し、import 規則の例外や依存更新は追加しません。入力欄へのフォーカス中は AI フローティングリンクを非表示にして、欄の端へのタップを妨げません。

アプリのナビゲーションでは各フレームワークの表示を保持し、Enter/Space 操作と可視フォーカスを提供します。NutUI は各タブをネイティブボタンで包み、内部バッジへのフォーカス属性の二重転送を避けます。既存の `keep-px` セレクターで戻るボタンとタブの 44px の最小タッチ領域のみを保持し、ほかのレイアウトは従来の vw 変換を使用します。WebKit のキーボード検証には Safari の既定モードでボタンも対象にする Option+Tab を使用します。

今回検証した WebKit の既知の制限：遅延モジュールに HTTP 503 を注入すると、ドキュメント遷移後も元ページに失敗したモジュールが残り、再リクエストされません。再読み込みの回帰テストは無効化も期待失敗扱いもせず、このブラウザーで失敗を記録します。独立に作成したページは読み込めますが、ユーザー操作のポップアップでも失敗したため、未検証のポップアップ回避策は提供しません。Chromium では通常の再読み込みを検証しています。実機 Safari の動作を証明するものではありません。

`postcss-mobile-forever` 5 は文字列の除外セレクターを完全一致で比較します。既存の `keep-px` をクラス境界の正規表現に変更し、Vue の scoped セレクターにも適用します。通常の px から vw への変換は維持します。
