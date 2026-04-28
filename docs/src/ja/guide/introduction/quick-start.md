# クイックスタート

## 環境要件

- **Node.js** >= 20.12.0
- **pnpm** >= 10.0.0

## インストール

```bash
# プロジェクトをクローン
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# 依存関係をインストール
pnpm install
```

## 開発

```bash
# すべてのアプリを起動（対話式選択）
pnpm dev

# 特定のアプリを起動
pnpm dev:nutui    # NutUI バージョン
pnpm dev:vant     # Vant バージョン
pnpm dev:varlet   # Varlet バージョン
```

Mock サーバーは Nitro 経由で `http://localhost:5320` に自動起動し、フロントエンドは Vite proxy で `/api` リクエストをプロキシします。

## ビルド

```bash
# すべてのアプリをビルド
pnpm build

# 特定のアプリをビルド
pnpm build:nutui
pnpm build:vant
pnpm build:varlet
```

## プレビュー

```bash
cd apps/h5-nutui
pnpm preview
```

## クリーンアップ

```bash
# すべての node_modules、dist、.turbo キャッシュを削除
pnpm clean

# ロックファイルも削除
pnpm clean --del-lock
```

## 新しいアプリの作成

```bash
# CLI で対話式に新しい H5 アプリを作成
pnpm create-app
```

Varlet / Vant / NutUI をサポートし、完全なプロジェクト構造を自動生成します。詳細は[アプリ作成](/ja/guide/essentials/create-app)を参照してください。

## テストアカウント

Mock サーバーは以下のテストアカウントを提供しています：

| ユーザー名 | パスワード | 役割         |
| ---------- | ---------- | ------------ |
| user       | 123456     | 一般ユーザー |
| admin      | 123456     | 管理者       |
