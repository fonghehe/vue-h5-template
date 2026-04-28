# 建置部署

## 建置

```bash
pnpm build
pnpm build:nutui
pnpm build:vant
pnpm build:varlet
```

建置產物輸出在各應用的 `dist/` 目錄下。

## Docker 部署

```bash
docker build -f scripts/deploy/Dockerfile -t vue-h5-template .
```

## 環境變數

| 變數                      | 說明                 |
| ------------------------- | -------------------- |
| `VITE_PORT`               | 開發伺服器埠號       |
| `VITE_BASE`               | 基礎路徑             |
| `VITE_GLOB_API_URL`       | API 請求前綴         |
| `VITE_NITRO_MOCK`         | 是否啟用 Mock 服務   |
| `VITE_DEVTOOLS`           | 是否啟用 DevTools    |
| `VITE_INJECT_APP_LOADING` | 是否注入全域 loading |
