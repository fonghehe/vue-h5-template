# よくある質問

## インストールの問題

### `pnpm install` が失敗する

正しいバージョンを使用しているか確認してください：

- Node.js >= 20.12.0
- pnpm >= 10.0.0

```bash
node -v
pnpm -v
```

古いバージョンの場合はアップグレード：

```bash
npm i -g corepack
corepack enable
corepack prepare pnpm@latest --activate
```

### ポートが使用中

デフォルトポートが使用中の場合、対応アプリの `.env.development` の `VITE_PORT` を変更するか、直接指定：

```bash
VITE_PORT=3000 pnpm dev:nutui
```

## 開発の問題

### Mock サーバーが動作しない

`.env.development` で `VITE_NITRO_MOCK=true` が設定されていることを確認してください。Mock サーバーはデフォルトでポート `5320` で動作します。

### 自動インポートが機能しない

一度 `pnpm dev` を実行して自動インポートの型宣言ファイルを生成してください。生成されたファイル（`auto-imports.d.ts`、`components.d.ts`）はバージョン管理にコミットしてください。

### 新しいページを追加するには？

1. `src/views/` に `.vue` ファイルを作成
2. `src/router/` にルートを追加
3. タブバーエントリが必要な場合、レイアウト設定を更新

### 新しい API エンドポイントを追加するには？

1. `src/api/` に API 関数を作成
2. Mock データを使用する場合、`apps/backend-mock/api/` に Mock ハンドラーを追加

## ビルドの問題

### ビルド時のメモリ不足

ルートの `package.json` に `NODE_OPTIONS=--max-old-space-size=8192` が設定されています。それでも不足する場合は値を増やしてください。

### サブディレクトリにデプロイするには？

`.env.production` で `VITE_BASE` を設定：

```bash
VITE_BASE=/my-app/
```

## その他

### 不要な UI フレームワークアプリを削除するには？

1. アプリディレクトリを削除（例：`apps/h5-varlet/`）
2. ルートの `package.json` から対応するスクリプトを削除
3. `pnpm install` を実行して workspace を更新

### 新しい共有パッケージを追加するには？

1. `packages/` 配下に新しいディレクトリを作成
2. `@vh5/` スコープで `package.json` を追加
3. アプリから `"@vh5/my-package": "workspace:*"` で参照
