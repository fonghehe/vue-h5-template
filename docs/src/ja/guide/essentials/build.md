# ビルドとデプロイ

## ビルド

```bash
pnpm build           # 全アプリをビルド
pnpm build:nutui     # NutUI 版
pnpm build:vant      # Vant 版
pnpm build:varlet    # Varlet 版
```

出力は各アプリの `dist/` ディレクトリに生成されます。

## プレビュー

```bash
cd apps/h5-nutui
pnpm preview
```

## Docker

```bash
docker build -f scripts/deploy/Dockerfile -t vue-h5-template .
```

Nginx 設定テンプレート：`scripts/deploy/nginx.conf`。

## GitHub Pages 自動デプロイ

`main` ブランチにプッシュすると GitHub Actions が自動でドキュメントをビルドして GitHub Pages にデプロイします。

**有効化方法**：リポジトリの Settings → Pages で Source を **GitHub Actions** に設定。

```yaml
# .github/workflows/docs.yml
on:
  push:
    branches: [main]
    paths: ["docs/**"]
```

トリガー条件：`main` へのプッシュで `docs/**` に変更がある場合、または手動で `workflow_dispatch`。

## 環境変数

| 変数                      | 説明                         |
| ------------------------- | ---------------------------- |
| `VITE_PORT`               | 開發サーバーポート           |
| `VITE_BASE`               | ベースパス                   |
| `VITE_GLOB_API_URL`       | API リクエストプレフィックス |
| `VITE_NITRO_MOCK`         | Mock サービスを有効化        |
| `VITE_DEVTOOLS`           | DevTools を有効化            |
| `VITE_INJECT_APP_LOADING` | グローバルローディングを注入 |
