# 專案介紹

這是 pnpm + Turborepo 管理的行動 Vue monorepo。三個應用獨立構建，透過 `packages/mobile-ui` 共用業務頁，保留各自原生導覽與元件展示，不會在一個正式應用載入三個 UI 框架。

現有英文優先中日切換、主題頂欄與 AI 浮動入口、商品及本機購物車、Axios/OpenAPI、Vue Query 分頁/更新/載入更多、可停止 SSE 聊天與安全 Markdown、SVG、行動 API 示例、可選 PWA 與正式構建圖片優化。

| Package | Repository catalog |
| --- | --- |
| Vue / Vue Router | 3.5 / 5.2 |
| TypeScript / Vite | 6.0 / 8.1 (Rolldown) |
| Pinia / Vue Query | 4.0 / 5.x |
| Vue I18n / UnoCSS | 11.4 / 66.x |
| Vant / NutUI / Varlet | 4.10 / 4.3 / 3.19 |
| Vitest / Playwright | 4.1 / 1.62 |

版本系列以 catalog 為準，不表示上游最新；精確值見 `pnpm-lock.yaml`，環境要求見[快速開始](./quick-start.md)。

路由手寫，UnoCSS 配合 scoped CSS。SSR/SSG、正式上傳、自動 token 更新、全應用角色授權尚非完成能力。參見[遷移與規劃](../v2/migration-v2.md)。
