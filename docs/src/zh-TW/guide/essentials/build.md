# 建置部署

## 建置

```bash
pnpm build
pnpm build:nutui
pnpm build:vant
pnpm build:varlet
```

建置產物輸出在各應用的 `dist/` 目錄下。

## 預覽

```bash
cd apps/h5-nutui
pnpm preview
```

## Docker 部署

```bash
docker build -f scripts/deploy/Dockerfile -t vue-h5-template .
```

Nginx 設定模板位於 `scripts/deploy/nginx.conf`。

## GitHub Pages 自動部署

專案內置 GitHub Actions Workflow，推送 `main` 分支時自動建置並部署文件到 GitHub Pages。

**啟用方式**：在儲庫設定 Settings → Pages 將 Source 設置為 **GitHub Actions**。

```yaml
# .github/workflows/docs.yml
on:
  push:
    branches: [main]
    paths: ["docs/**"]
```

觸發條件：push 到 `main` 且 `docs/**` 有變更，或手動觸發 `workflow_dispatch`。

## 環境變數

| 變數                      | 說明                 |
| ------------------------- | -------------------- |
| `VITE_PORT`               | 開發伺服器埠號       |
| `VITE_BASE`               | 基礎路徑             |
| `VITE_GLOB_API_URL`       | API 請求前綴         |
| `VITE_NITRO_MOCK`         | 是否啟用 Mock 服務   |
| `VITE_DEVTOOLS`           | 是否啟用 DevTools    |
| `VITE_INJECT_APP_LOADING` | 是否注入全域 loading |
