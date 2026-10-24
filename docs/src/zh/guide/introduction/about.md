# 项目介绍

Vue H5 Template 是 pnpm + Turborepo 管理的移动 Vue 单体仓库。五套应用独立构建，通过 `packages/mobile-ui` 共享业务页，原生导航与组件展示保留各 UI 框架实现。每个生产应用只使用一个 UI 框架。

当前包含：英文优先的中日文切换、主题顶栏与 AI 悬浮入口、商品列表/详情与本地购物车、Axios/OpenAPI 类型化契约、Vue Query 分页/变更/加载更多、可停止的 fetch/SSE 聊天和安全 Markdown、SVG 图标、移动浏览器示例、可选 PWA 与生产图片优化。

| 技术 | 职责 |
| --- | --- |
| Vue 3 / Vue Router | 界面和路由 |
| TypeScript / Vite / UnoCSS | 类型、构建和样式 |
| Pinia / TanStack Vue Query | 客户端状态和服务端数据缓存 |
| Axios / OpenAPI / Nitro | REST 请求、类型和 Mock API |
| Oxlint / ESLint / Stylelint / Oxfmt | 代码检查与格式化 |
| Vitest / Playwright | 单元、组件和浏览器测试 |

依赖范围统一维护在 `pnpm-workspace.yaml` 的 catalog 中，解析后的版本记录在 `pnpm-lock.yaml`。Node.js 和 pnpm 要求见[快速开始](./quick-start.md)。

路由为手写；UnoCSS 与 scoped CSS 配合，不是替代全部样式。PWA/调试工具可选；SSR/SSG、生产上传流程、自动刷新 token、所有应用的角色授权并非已完成能力。参见[迁移与路线图](../v2/migration-v2.md)。
