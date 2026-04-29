# 紹介

Vue H5 Template は **Turborepo** ベースの Vue 3 モバイル H5 開発テンプレート Monorepo プロジェクトです。

## 特徴

- **Monorepo 管理** — Turborepo + pnpm workspace で複数のアプリと共有パッケージを統合管理
- **3つの UI フレームワーク** — NutUI、Vant、Varlet の3バージョンを提供
- **TypeScript** — 完全な TypeScript サポート，unplugin-vue-router による型安全なファイルルーティング
- **Vite** — Vite 8 ベースのビルド、自動インポートとコンポーネント自動登録対応
- **UnoCSS** — アトミック CSS エンジンで全アプリに utility-first スタイルを提供
- **Pinia** — 状態管理 + 永続化（本番環境では AES 暗号化）
- **Mock バックエンド** — Nitro ベースの Mock サーバー、認証と商品 API を提供
- **Eruda** — モバイルデバッグコンソールを内蔵（非本番環境のみ）
- **統一規約** — ESLint / Prettier / Stylelint / Commitlint の設定を共有
- **動的タイトル** — ルート切り替時にページタイトルを自動更新
- **モバイル適応** — postcss-mobile-forever によるビューポート適応（デザイン幅 375px、最大表示幅 600px）
- **国際化** — 中国語（簡体・繁体）、英語、日本語の4言語をサポート

## 技術スタック

| 技術                | バージョン | 説明                         |
| ------------------- | ---------- | ---------------------------- |
| Vue 3               | 3.5        | フロントエンドフレームワーク |
| TypeScript          | 6.0        | 型安全                       |
| Vite                | 8.0        | ビルドツール                 |
| UnoCSS              | 66.x       | アトミック CSS エンジン      |
| Turborepo           | 2.9        | Monorepo 管理                |
| pnpm                | 10.27      | パッケージマネージャー       |
| Pinia               | 3.0        | 状態管理                     |
| Vue Router          | 5.0        | ルーティング                 |
| unplugin-vue-router | 0.19       | 型安全なファイルルーティング |
| Vue I18n            | 11.3       | 国際化                       |
| Nitro               | 2.x        | Mock サーバー                |
| NutUI               | 4.3        | UI コンポーネントライブラリ  |
| Vant                | 4.9        | UI コンポーネントライブラリ  |
| Varlet              | 3.12       | UI コンポーネントライブラリ  |
| VueUse              | 14.x       | コンポジションユーティリティ |
| Eruda               | 3.x        | モバイルデバッグコンソール   |

## プロジェクト構成

```
vue-h5-template/
├── apps/                 # アプリケーション
│   ├── h5-nutui/         # NutUI H5 アプリ（ポート 5777）
│   ├── h5-vant/          # Vant H5 アプリ（ポート 5778）
│   ├── h5-varlet/        # Varlet H5 アプリ（ポート 5779）
│   └── backend-mock/     # Nitro Mock バックエンド
├── packages/             # 共有パッケージ
│   ├── @core/            # コア（デザイン、composables、設定）
│   ├── locales/          # i18n ロケールメッセージ
│   ├── stores/           # Pinia 状態管理
│   ├── styles/           # グローバルスタイル
│   └── utils/            # ユーティリティ関数
├── internal/             # 内部設定パッケージ
│   ├── vite-config/      # 共有 Vite 設定
│   ├── tsconfig/         # 共有 TypeScript 設定
│   └── lint-configs/     # 共有 Lint 設定
├── scripts/              # ビルドスクリプト
└── docs/                 # ドキュメント（本サイト）
```
