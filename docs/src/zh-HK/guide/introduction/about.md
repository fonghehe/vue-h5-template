# 專案介紹

呢個係 pnpm + Turborepo 管理嘅 mobile Vue monorepo。五個應用獨立構建，透過 `packages/mobile-ui` 共用業務頁，保留各自原生導覽同元件示範。每個正式應用只用一個 UI 框架。

現有英文優先中日切換、主題頂欄同 AI 浮動入口、商品同本機購物車、Axios/OpenAPI、Vue Query 分頁/更新/載入更多、可停止 SSE 聊天同安全 Markdown、SVG、mobile API 示例、可選 PWA 同正式構建圖片優化。

| 技術 | 用途 |
| --- | --- |
| Vue 3 / Vue Router | 介面同路由 |
| TypeScript / Vite / UnoCSS | 型別、構建同樣式 |
| Pinia / TanStack Vue Query | 客戶端狀態同伺服器資料快取 |
| Axios / OpenAPI / Nitro | REST 請求、型別同 Mock API |
| Oxlint / ESLint / Stylelint / Oxfmt | 程式碼檢查同格式化 |
| Vitest / Playwright | 單元、組件同瀏覽器測試 |

依賴嘅版本範圍集中喺 `pnpm-workspace.yaml` 嘅 catalog，解析後嘅版本記錄喺 `pnpm-lock.yaml`。Node.js 同 pnpm 要求見[快速開始](./quick-start.md)。

路由手寫，UnoCSS 配合 scoped CSS。SSR/SSG、正式上傳、自動 token 更新、全應用角色授權未係完成能力。參見[遷移同規劃](../v2/migration-v2.md)。
