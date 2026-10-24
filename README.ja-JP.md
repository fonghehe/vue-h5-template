# Vue H5 Template

Vue 3、TypeScript、Turborepo を使ったモバイル Web アプリのテンプレートです。

[English](./README.md) | [简体中文](./README.zh-CN.md) | 日本語 | [繁體中文（台）](./README.zh-TW.md) | [繁體中文（港）](./README.zh-HK.md)

## 主な機能

Vant、NutUI、Varlet、TDesign Mobile Vue、Ionic Vue 向けに個別にビルドする 5 つのアプリがあります。ホーム、一覧、会員、サンプルのタブと、商品詳細、お気に入り、保存されるカート、決済デモを共有します。ナビゲーション、テーマ、コンポーネント例はアプリごとに用意しています。

- **データとルーティング**。遅延読み込みのルートを明示し、OpenAPI の生成型と共通の Axios クライアントを使います。サーバーデータは TanStack Vue Query、セッションとカートは Pinia が管理します。
- **ストリーミングチャット**。SSE クライアントは停止、再試行、再生成とサニタイズ済み Markdown に対応します。モデルの設定と認証情報はバックエンドで管理します。
- **モバイル Web**。セーフエリア、キーボードに対応するチャット入力、プル更新、オフライン表示、任意の PWA に対応します。
- **言語**。既定は英語です。会員画面で英語・簡体字中国語・日本語を切り替えられます。ドキュメントは 5 言語で提供しています。

## ローカルで起動する

**Node.js 24.x** と **pnpm 12 以降** を使用します。pnpm のバージョンはルートのマニフェストで固定しています。

```bash
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template
pnpm install
```

起動するアプリを選びます。`pnpm dev` からも対話形式で選択できます。

```bash
pnpm dev:vant    # 5778
pnpm dev:nutui   # 5777
pnpm dev:varlet  # 5779
pnpm dev:tdesign # 5783
pnpm dev:ionic   # 5784
```

開発コマンドはポート **5320** の Nitro Mock を起動または再利用します。デモアカウントは `user / 123456` と `admin / 123456` です。業務 API（8002）と AI サービス（8001）を利用する場合は、両方を起動してから `pnpm dev:services:<ui>` を実行します。

## ビルドと検証

| 用途 | コマンド |
| --- | --- |
| ドキュメントの開発サーバー | `pnpm dev:docs` |
| アプリのビルド | `pnpm build:vant` / `pnpm build:nutui` / `pnpm build:varlet` / `pnpm build:tdesign` / `pnpm build:ionic` |
| ワークスペース全体 / ドキュメントのみ | `pnpm build` / `pnpm build:docs` |
| Lint、型チェック、ユニットテスト、ビルド | `pnpm check` |
| 5 アプリのブラウザーテスト | `pnpm test:e2e` |
| API 型の再生成 | `pnpm api:generate` |

アプリの出力先は `apps/h5-<ui>/dist` です。ビルドターゲットは Chrome/Android WebView 111 以降と Safari/iOS WebView 16.4 以降です。本番ホストで SPA フォールバックと 2 つのバックエンドへのルーティングを設定します。

## リポジトリ構成

| パス | 役割 |
| --- | --- |
| `apps/h5-{vant,nutui,varlet,tdesign,ionic}` | アプリシェル、ルート定義、UI アダプター |
| `packages/mobile-ui` | 共通ページとクエリフック |
| `packages/{api-client,ai-chat}` | REST 契約とストリーミングクライアント |
| `packages/{locales,stores,styles}` | 翻訳、クライアントの状態、テーマ |
| `apps/backend-mock` | 開発用 Nitro Mock |
| `internal` | 共通のビルド、Lint、TypeScript 設定 |
| `openapi`, `e2e`, `docs` | API スキーマ、ブラウザーテスト、ドキュメント |

## ガイド

[オンライン文書](https://fonghehe.github.io/vue-h5-template/ja/) · [バックエンドモード](./docs/src/ja/guide/essentials/server.md) · [デプロイ](./docs/src/ja/guide/essentials/build.md) · [貢献ガイド](./CONTRIBUTING.md)

[MIT](./LICENSE)
