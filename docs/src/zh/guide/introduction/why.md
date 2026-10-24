# 为什么选择 Vue H5 Template？

## 背景

在移动端 H5 开发中，开发者在启动新项目时常常面临类似的挑战：

- 选择合适的 UI 框架（NutUI、Vant、Varlet、TDesign、Ionic Vue）并正确配置
- 从零开始配置构建工具和开发环境
- 在团队中建立统一的代码规范、lint 和格式化标准
- 实现常见功能如登录认证、状态管理、国际化等
- 管理多个应用之间的共享代码和配置

Vue H5 Template 提供五个移动 Web 应用，共用业务页面和工具链。选一个应用作为起点，再按部署指南接入业务后端。

## 为什么选择 Monorepo？

### 代码复用

在传统的多仓库模式中，共享代码（utils、stores、styles、configs）需要单独维护和发布。而在 Monorepo 中：

- 共享包通过 workspace 引用直接链接
- 共享代码的变更立即对所有应用生效
- 无需发布和管理内部包的版本

### 统一规范

使用 Monorepo，所有应用共享相同的：

- ESLint、Oxfmt、Stylelint 配置
- TypeScript 配置
- 提交约定和 CI/CD 流程
- 依赖版本（通过 pnpm catalog）

### 多 UI 框架支持

不同团队或项目可能偏好不同的 UI 框架。Vue H5 Template 提供了五套开箱即用的应用模板：

| 应用      | UI 框架    | 默认端口 |
| --------- | ---------- | -------- |
| h5-nutui  | NutUI 4.x  | 5777     |
| h5-vant   | Vant 4.x   | 5778     |
| h5-varlet | Varlet 3.x | 5779     |
| h5-tdesign | TDesign Mobile Vue 1.x | 5783 |
| h5-ionic | Ionic Vue 9.x | 5784 |

你可以选择其中一个，也可以同时使用多个。

## 质量与规范

项目采用严格的质量标准：

- **类型安全**：完整的 TypeScript 覆盖
- **代码风格**：ESLint + Oxfmt + Stylelint，共享配置
- **提交约定**：Commitlint + Conventional Commits
- **Git Hooks**：Lefthook 处理 pre-commit 和 commit-msg 检查
- **拼写检查**：CSpell 检查拼写错误
