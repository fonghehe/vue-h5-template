<div align="center">

<h1>Vue H5 Template</h1>

Vue 3 + TypeScript + Turborepo ベースのモバイル H5 開発テンプレート

[English](./README.md) | [简体中文](./README.zh-CN.md) | 日本語 | [繁體中文](./README.zh-TW.md) | [香港繁體](./README.zh-HK.md)

</div>

## はじめに

Vue H5 Template は、無料でオープンソースのモバイル H5 開発テンプレートです。Turborepo Monorepo アーキテクチャをベースに、最新の Vue 3、Vite、TypeScript などの主要技術スタックを使用し、NutUI、Vant、Varlet の3つの UI フレームワークに対応した H5 アプリケーションテンプレートを提供します。

## 特徴

- **Monorepo アーキテクチャ**：Turborepo + pnpm workspace で複数の H5 アプリと共有パッケージを統合管理
- **3つの UI フレームワーク**：NutUI、Vant、Varlet の3バージョンを提供、自由に選択可能
- **TypeScript**：完全な TypeScript サポート
- **Vite ビルド**：Vite ベースのビルド設定、自動インポートとコンポーネント自動登録に対応
- **状態管理**：Pinia + 永続化プラグイン、本番環境では AES 暗号化ストレージ
- **Mock サーバー**：Nitro ベースの Mock バックエンド、認証と商品 API を提供
- **統一規約**：ESLint / Prettier / Stylelint / Commitlint 設定を共有し、重複を削減
- **モバイル対応**：postcss-px-to-viewport によるモバイル適応ソリューション
- **国際化**：中国語（簡体・繁体）、英語、日本語の4言語をサポート

## 技術スタック

| 技術       | バージョン | 説明                          |
| ---------- | ---------- | ----------------------------- |
| Vue 3      | 3.5        | フロントエンドフレームワーク  |
| TypeScript | 6.0        | 型安全性                      |
| Vite       | 8.0        | ビルドツール                  |
| Turborepo  | 2.9        | Monorepo 管理                 |
| pnpm       | 10.27      | パッケージマネージャー        |
| Pinia      | 3.0        | 状態管理                      |
| Vue Router | 5.0        | ルーティング                  |
| Vue I18n   | 11.3       | 国際化                        |
| Nitro      | 2.x        | Mock サーバー                 |
| NutUI      | 4.3        | UI コンポーネントライブラリ   |
| Vant       | 4.9        | UI コンポーネントライブラリ   |
| Varlet     | 3.12       | UI コンポーネントライブラリ   |
| VueUse     | 14.x       | コンポジション ユーティリティ |

## 動作環境

- [Node.js](https://nodejs.org/) >= 20.12.0
- [pnpm](https://pnpm.io/) >= 10.0.0
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
│   ├── lint-configs/       # ESLint、Stylelint、Commitlint 設定
│   ├── node-utils/         # Node.js ユーティリティ
│   ├── tsconfig/           # 共有 TypeScript 設定
│   └── vite-config/        # 共有 Vite 設定
├── packages/
│   ├── @core/              # コアパッケージ（base、composables、preferences）
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

最新のブラウザとモバイルブラウザをサポートしています。IE はサポートしていません。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge ≥ 80                                                                                                                                                                                              | Firefox ≥ 78                                                                                                                                                                                                      | Chrome ≥ 80                                                                                                                                                                                                   | Safari ≥ 14                                                                                                                                                                                                   |

## コントリビューション

コントリビューションは歓迎します。[コントリビューションガイド](https://github.com/fonghehe/vue-h5-template/blob/main/CONTRIBUTING.md)をご参照ください。

Git コミット規約は [Conventional Commits](https://www.conventionalcommits.org/) に従ってください。

## ライセンス

[MIT](./LICENSE)
