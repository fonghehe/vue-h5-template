# ビルドとデプロイ

## ビルド

```bash
pnpm build           # 全アプリをビルド
pnpm build:nutui     # NutUI 版
pnpm build:vant      # Vant 版
pnpm build:varlet    # Varlet 版
```

出力は各アプリの `dist/` ディレクトリに生成されます。

## Docker

```bash
docker build -f scripts/deploy/Dockerfile -t vue-h5-template .
```
