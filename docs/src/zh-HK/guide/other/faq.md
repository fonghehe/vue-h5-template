# 常見問題

## 安裝問題

### `pnpm install` 失敗

請確保使用了正確的版本：

- Node.js >= 20.12.0
- pnpm >= 10.0.0

### 埠號被佔用

可以修改對應應用的 `.env.development` 中的 `VITE_PORT`。

## 開發問題

### Mock 服務不工作

確保 `.env.development` 中設定了 `VITE_NITRO_MOCK=true`。

### 如何新增頁面？

1. 在 `src/views/` 中建立 `.vue` 檔案
2. 在 `src/router/` 中新增路由
3. 如果頁面需要 tabbar 入口，更新 layout 設定

## 其他

### 如何移除不需要的 UI 框架應用？

1. 刪除應用目錄（如 `apps/h5-varlet/`）
2. 從根目錄 `package.json` 中移除對應的指令碼命令
3. 執行 `pnpm install` 更新 workspace
