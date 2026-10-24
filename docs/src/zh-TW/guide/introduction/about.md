# 專案介紹

這是 pnpm + Turborepo 管理的行動 Vue monorepo。五個應用獨立構建，透過 `packages/mobile-ui` 共用業務頁，保留各自原生導覽與元件展示。每個正式應用僅使用一個 UI 框架。

現有英文優先中日切換、主題頂欄與 AI 浮動入口、商品及本機購物車、Axios/OpenAPI、Vue Query 分頁/更新/載入更多、可停止 SSE 聊天與安全 Markdown、SVG、行動 API 示例、可選 PWA 與正式構建圖片優化。

| 技術 | 用途 |
| --- | --- |
| Vue 3 / Vue Router | 介面與路由 |
| TypeScript / Vite / UnoCSS | 型別、建置與樣式 |
| Pinia / TanStack Vue Query | 用戶端狀態與伺服器資料快取 |
| Axios / OpenAPI / Nitro | REST 請求、型別與 Mock API |
| Oxlint / ESLint / Stylelint / Oxfmt | 程式碼檢查與格式化 |
| Vitest / Playwright | 單元、元件與瀏覽器測試 |

相依套件的版本範圍集中在 `pnpm-workspace.yaml` 的 catalog，解析後的版本記錄在 `pnpm-lock.yaml`。Node.js 和 pnpm 需求見[快速開始](./quick-start.md)。

路由手寫，UnoCSS 配合 scoped CSS。SSR/SSG、正式上傳、自動 token 更新、全應用角色授權尚非完成能力。參見[遷移與規劃](../v2/migration-v2.md)。
