# 建立應用

使用 CLI 工具快速建立新的 H5 應用。

## 使用方式

```bash
pnpm create-app
```

CLI 會互動式引導你完成：

1. **選擇 UI 框架** — Varlet / Vant / NutUI
2. **輸入應用名稱** — 如 `h5-my-app`

## 生成內容

執行後會在 `apps/` 目錄下生成完整的應用結構：

```
apps/h5-my-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── env.d.ts
├── .env
├── .env.development
├── public/
├── src/
│   ├── main.ts
│   ├── bootstrap.ts
│   ├── App.vue
│   ├── router/index.ts
│   ├── views/
│   │   ├── home/index.vue
│   │   ├── list/index.vue
│   │   ├── mine/index.vue
│   │   └── login/index.vue
│   ├── components/
│   ├── layout/index.vue    (從參考應用複製)
│   ├── locales/             (從參考應用複製)
│   ├── api/                 (從參考應用複製)
│   └── stores/              (從參考應用複製)
└── types/
```

## 後續步驟

建立完成後：

1. 執行 `pnpm install` 安裝依賴
2. 在根目錄 `package.json` 新增啟動腳本：

```json
{
  "scripts": {
    "dev:h5-my-app": "pnpm -F @vh5/h5-my-app run dev",
    "build:h5-my-app": "pnpm run build --filter=@vh5/h5-my-app"
  }
}
```

3. 執行 `pnpm dev:h5-my-app` 開始開發

## 自動配置

生成的應用已自動配置：

- **Vite 代理** — `/api` 代理到 Mock 服務 `localhost:5320`
- **共享樣式** — 引入 `virtual:uno.css`（UnoCSS）與 `@vh5/styles/global`
- **狀態管理** — 使用 `@vh5/stores`（Pinia + 持久化）；namespace 由 `VITE_APP_NAMESPACE` + 版本號 + 環境拼接
- **國際化** — 使用 `@vh5/locales`
- **路由進度条** — 使用 `@vh5/utils` 的 NProgress
- **UI 元件** — 根據選擇的框架自動按需註冊：
  - **NutUI**：Toast / Notify / Dialog / ImagePreview 的 CSS 在 `bootstrap.ts` 中手動引入，其他元件按需載入
  - **Vant**：元件 CSS 由 `VantResolver` 按需注入，`bootstrap.ts` 無需手動引入全量樣式
  - **Varlet**：元件 CSS 由 `VarletImportResolver` 按需載入；函數式元件（如 `Snackbar`）需在呼叫處手動引入
