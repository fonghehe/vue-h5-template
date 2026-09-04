# UI フレームワーク戦略

Vant のヘッダーは `--app-primary` を背景に、タイトル・アイコン・テキスト操作を白で表示します。ナビゲーション変数を `.van-nav-bar` に設定し、遅延読み込みされる Vant のルート既定値による上書きを防ぎます。

3つのアプリは同じ機能と順序のタブを提供します：**Home → List → Member → Examples**。URL は `/home`、`/list`、`/member`、`/examples` です。旧 `/mine` と `/example` も利用できます。Member は未ログインでも開けるため、言語変更に認証は不要です。保護された API の 401 は引き続き共通処理します。

## 共通機能と独立したテーマ

`packages/mobile-ui` はホーム、商品一覧・詳細、カート、決済、メンバー、サンプル、Chat、Query、Request、Mobile Web API の UI 非依存ビューを提供します。各アプリは遅延読み込みルートからフレームワーク名とセッション情報を渡します。REST と Streaming のプロトコルは `api-client` と `ai-chat` が担当します。商品データは Query、カートの数量・選択状態は Pinia が管理します。

ナビゲーションと `/examples/components` は各ライブラリ固有の UI を維持します。NutUI は `NutTabbarItem.to` で遷移し、`tab-switch` のコンポーネントインスタンスをルートとして扱いません。製品ビルドは選択した1つの UI ライブラリだけを含みます。

`packages/styles` の Token で Vant の青（`#1989fa`）、NutUI の赤（`#fa2c19`）、Varlet の紫（`#6750a4`）を統一します。共有ページはレスポンシブ Grid を使い、px-to-vw 変換から除外して実寸 44px のタッチ領域を維持します。内部ビルド設定変更後は `pnpm -F @vh5/vite-config stub` を実行します。

## 言語と AI への入口

初期言語は英語です。Home と Member で English、简体中文、日本語を選択でき、`vh5:locale` に保存されます。本文、ルート・文書タイトル、入力例、アクセシビリティラベルを一緒に翻訳します。REST は `Accept-Language` を送り、Nitro Mock は翻訳済み商品データを返します。実際の業務サービスの翻訳はバックエンド側で提供してください。Query のキャッシュキーには言語を含めます。

テーマ色の AI フローティングボタンをタブの上に配置し、遅延読み込みの `/ai/chat` を開きます。Chat、Login、Cart、Payment、Details では入力や購入操作を妨げないよう非表示です。ストリーミング、停止、再生成、コピー、安全な Markdown は3つのアプリで共通です。

`pnpm dev:<ui>`（Nitro Mock）と `pnpm dev:services:<ui>`（AI 8001、Business 8002）を引き続き利用できます。フロントエンド環境変数にプロバイダーの秘密鍵を保存しないでください。

SVG と任意の PWA サンプルも3アプリで共通です。Vant 固有の SVG 資産も引き続き利用できます。NutUI にない日本語辞書は型付きの `apps/h5-nutui/src/locales/nutui-ja.ts` で補います。繁体字中国語の既存辞書はカスタム統合向けに残し、標準の選択欄には上記3言語を表示します。言語設定は Pinia ではなく Vue I18n と localStorage で管理します。

NutUI のナビゲーション変数は `.nut-navbar` に設定します。戻るボタンのスロットにネイティブの `Left` アイコンを置き、`currentColor` を継承させ、固定の灰色が赤いヘッダーで見えにくくなる問題を防ぎます。
