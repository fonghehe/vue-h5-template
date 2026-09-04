# 项目介绍

Vue H5 Template 是 pnpm + Turborepo 管理的移动 Vue 单体仓库。三套应用独立构建，通过 `packages/mobile-ui` 共享业务页，原生导航与组件展示保留各 UI 框架实现。一个生产应用不会加载全部三个框架。

当前包含：英文优先的中日文切换、主题顶栏与 AI 悬浮入口、商品列表/详情与本地购物车、Axios/OpenAPI 类型化契约、Vue Query 分页/变更/加载更多、可停止的 fetch/SSE 聊天和安全 Markdown、SVG 图标、移动浏览器示例、可选 PWA 与生产图片优化。

| Package | Repository catalog |
| --- | --- |
| Vue / Vue Router | 3.5 / 5.2 |
| TypeScript / Vite | 6.0 / 8.1 (Rolldown) |
| Pinia / Vue Query | 4.0 / 5.x |
| Vue I18n / UnoCSS | 11.4 / 66.x |
| Vant / NutUI / Varlet | 4.10 / 4.3 / 3.19 |
| Vitest / Playwright | 4.1 / 1.62 |

表格是仓库 catalog 的版本系列，不表示上游最新版本；精确版本见 `pnpm-lock.yaml`，Node/pnpm 要求见[快速开始](./quick-start.md)。

路由为手写；UnoCSS 与 scoped CSS 配合，不是替代全部样式。PWA/调试工具可选；SSR/SSG、生产上传流程、自动刷新 token、所有应用的角色授权并非已完成能力。参见[迁移与路线图](../v2/migration-v2.md)。
