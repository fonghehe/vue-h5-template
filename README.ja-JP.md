<div align="center">

<h1>Vue H5 Template</h1>

Vue 3 + TypeScript + Turborepo ベースのモバイル H5 開発テンプレート

[English](./README.md) | [简体中文](./README.zh-CN.md) | 日本語 | [繁體中文(台)](./README.zh-TW.md) | [繁體中文(港)](./README.zh-HK.md)

</div>

## 一貫したモバイル体験

3つのアプリは Home / List / Member / Examples、商品詳細とカート、Query・API の例、ストリーミングチャットを共有します。ナビゲーションとコンポーネント例は各 UI 固有のものを維持し、共有ページはアプリごとのテーマ色を使います。

初期言語は英語です。Home または Member で中国語・日本語に切り替え、選択を保存します。本文、文書の言語、ルートタイトル、Mock 商品の言語も同期します。AI ボタンはタブ上に表示し、入力・購入関連ページでは非表示です。320px 幅でも商品カードのタッチ領域は実寸 44px を維持します。

全アプリが Mock と独立した AI/Business サービスに対応します。`pnpm test:e2e` で3アプリを検証できます。[UI アーキテクチャ](docs/src/ja/guide/v2/ui-framework.md)を参照してください。

## はじめに

Vue H5 Template は、無料でオープンソースのモバイル H5 開発テンプレートです。Turborepo Monorepo アーキテクチャをベースに、最新の Vue 3、Vite、TypeScript などの主要技術スタックを使用し、NutUI、Vant、Varlet の3つの UI フレームワークに対応した H5 アプリケーションテンプレートを提供します。

## 特徴

- **Monorepo アーキテクチャ**：Turborepo + pnpm workspace で複数の H5 アプリと共有パッケージを統合管理
- **3つの UI フレームワーク**：NutUI、Vant、Varlet の3バージョンを提供、自由に選択可能
- **独立したビジュアルシステム**：Vant Blue、NutUI Red、Varlet Purple の Token を分離し、色の混在を防止
- **型安全な基盤**：Strict TypeScript、明示的な Lazy Route、OpenAPI 生成型、統一 API Error
- **Streaming AI Chat**：Vendor-neutral SSE/ReadableStream、AbortController、安全な Markdown
- **Server State**：TanStack Vue Query による Cache、Mutation、Pagination、Infinite Query
- **実用的な Mobile Pattern**：Error Boundary、Offline、Visual Viewport、Pull-to-refresh、Web Share、Clipboard、永続化カート
- **Vite ビルド**：Vite ベースのビルド設定、自動インポートとコンポーネント自動登録に対応
- **UnoCSS**：アトミック CSS エンジンで全アプリに utility-first スタイルを提供
- **状態管理**：Pinia + 永続化プラグイン、本番環境では AES 暗号化ストレージ
- **Mock サーバー**：Nitro ベースの Mock バックエンド、認証と商品 API を提供
- **Eruda**：モバイルデバッグコンソールを内蔵（非本番環境のみ）
- **統一規約**：ESLint / OxLint / Stylelint / Oxfmt / Commitlint 設定を共有し、重複を削減
- **モバイル対応**：postcss-mobile-forever によるモバイル適応（デザイン幅 375px、最大表示幅 600px）
- **国際化**：中国語（簡体・繁体）、英語、日本語の4言語をサポート

## 技術スタック

| 技術                | バージョン | 説明                          |
| ------------------- | ---------- | ----------------------------- |
| Vue 3               | 3.5        | フロントエンドフレームワーク  |
| TypeScript          | 6.0        | 型安全性                      |
| Vite                | 8.1        | ビルドツール                  |
| UnoCSS              | 66.x       | アトミック CSS エンジン       |
| Turborepo           | 2.10        | Monorepo 管理                 |
| pnpm                | 11.10      | パッケージマネージャー        |
| Pinia               | 4.0        | 状態管理                      |
| Vue Router          | 5.0        | ルーティング                  |
| TanStack Vue Query  | 5.x        | Server State と Cache         |
| Axios               | 1.x        | 型安全な REST Transport       |
| Vue I18n            | 11.4       | 国際化                        |
| Nitro               | 2.x        | Mock サーバー                 |
| NutUI               | 4.3        | UI コンポーネントライブラリ   |
| Vant                | 4.10        | UI コンポーネントライブラリ   |
| Varlet              | 3.19       | UI コンポーネントライブラリ   |
| VueUse              | 14.x       | コンポジション ユーティリティ |
| Eruda               | 3.x        | モバイルデバッグコンソール    |

## 動作環境

- [Node.js](https://nodejs.org/) >= 22.18.0
- [pnpm](https://pnpm.io/) >= 11.0.0
- [Git](https://git-scm.com/)

## インストール

```bash
# プロジェクトをクローン
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# 依存関係をインストール
pnpm install

# 開発サーバーを起動（インタラクティブ選択）
pnpm dev

# 特定のアプリを起動
pnpm dev:nutui    # NutUI 版
pnpm dev:vant     # Vant 版
pnpm dev:varlet   # Varlet 版
```

開発時は既定で組み込みの Nitro Mock を使用します。`vue-h5-template-business-service`（`:8002`）と `vue-h5-template-ai-service`（`:8001`）に接続する場合は両方のバックエンドを起動し、`pnpm dev:services:vant`、`pnpm dev:services:nutui`、または `pnpm dev:services:varlet` を実行してください。ルーティングと環境変数は[リクエスト設計](https://fonghehe.github.io/vue-h5-template/ja/guide/v2/request)を参照してください。

## ビルド

```bash
# すべてのアプリをビルド
pnpm build

# 特定のアプリをビルド
pnpm build:nutui
pnpm build:vant
pnpm build:varlet

# ドキュメントをビルド
pnpm build:docs
```

## プロジェクト構造

```
vue-h5-template/
├── apps/
│   ├── backend-mock/       # Nitro Mock サーバー
│   ├── h5-nutui/           # NutUI H5 アプリ（ポート 5777）
│   ├── h5-vant/            # Vant H5 アプリ（ポート 5778）
│   └── h5-varlet/          # Varlet H5 アプリ（ポート 5779）
├── docs/                   # VitePress ドキュメント
├── internal/
│   ├── lint-configs/       # ESLint、OxLint、Stylelint、Oxfmt、Commitlint 設定
│   ├── node-utils/         # Node.js ユーティリティ
│   ├── tsconfig/           # 共有 TypeScript 設定
│   └── vite-config/        # 共有 Vite 設定
├── packages/
│   ├── @core/              # コアパッケージ（base/shared、design、typings、composables）
│   ├── locales/            # i18n ロケールメッセージ
│   ├── stores/             # Pinia ストア
│   ├── styles/             # 共有スタイル
│   └── utils/              # 共有ユーティリティ
└── scripts/                # ビルドスクリプトと CLI ツール
```

## テストアカウント

Mock サーバーは以下のテストアカウントを提供します：

| ユーザー名 | パスワード | ロール       |
| ---------- | ---------- | ------------ |
| user       | 123456     | 一般ユーザー |
| admin      | 123456     | 管理者       |

## ドキュメント

- [オンラインドキュメント](https://fonghehe.github.io/vue-h5-template/)

## ブラウザサポート

本番ターゲットは Chrome / Android WebView 111+ と Safari / iOS WebView 16.4+ です。同等エンジンの最近の WeChat / WeCom WebView をサポートし、IE と旧 Android WebView は対象外です。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge ≥ 111 | Firefox ≥ 115 | Chrome ≥ 111 | Safari ≥ 16.4 |

## コントリビューション

コントリビューションは歓迎します。[コントリビューションガイド](https://github.com/fonghehe/vue-h5-template/blob/main/CONTRIBUTING.md)をご参照ください。

Git コミット規約は [Conventional Commits](https://www.conventionalcommits.org/) に従ってください。

## ライセンス

[MIT](./LICENSE)
