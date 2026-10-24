# Vue H5 Template

基于 Vue 3、TypeScript 和 Turborepo 的移动 Web 开发模板。

[English](./README.md) | 简体中文 | [日本語](./README.ja-JP.md) | [繁體中文（台）](./README.zh-TW.md) | [繁體中文（港）](./README.zh-HK.md)

## 项目包含什么

Vant、NutUI、Varlet、TDesign Mobile Vue 和 Ionic Vue 是五个独立构建的应用。它们共用首页、列表、会员和示例四个主入口，以及商品详情、收藏、本地购物车和结算演示。每个应用有自己的导航、主题和组件示例。

- **数据与路由**。使用显式懒加载路由、OpenAPI 生成类型和共享 Axios 客户端。TanStack Vue Query 管理远程数据，Pinia 管理会话和本地购物车。
- **流式聊天**。SSE 客户端支持停止、重试、重新生成和经过净化的 Markdown。模型配置和凭据由配套后端管理。
- **移动端交互**。提供安全区适配、跟随键盘调整的聊天输入、下拉刷新、离线提示和可选 PWA。
- **语言**。应用默认使用英文，可在会员页切换英文、简体中文和日文。项目文档提供五种语言版本。

## 本地启动

使用 **Node.js 24.x**，以及 **pnpm 12 或以上**。根清单固定了 pnpm 版本。

```bash
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template
pnpm install
```

选择一个应用启动。也可以用 `pnpm dev` 交互选择工作区包。

```bash
pnpm dev:vant    # 5778
pnpm dev:nutui   # 5777
pnpm dev:varlet  # 5779
pnpm dev:tdesign # 5783
pnpm dev:ionic   # 5784
```

开发命令会启动或复用 **5320** 端口的 Nitro Mock，测试账号为 `user / 123456` 和 `admin / 123456`。接入独立业务服务（8002）和 AI 服务（8001）时，先启动两个后端，再运行 `pnpm dev:services:<ui>`。

## 构建与验证

| 用途 | 命令 |
| --- | --- |
| 本地文档 | `pnpm dev:docs` |
| 构建单个应用 | `pnpm build:vant` / `pnpm build:nutui` / `pnpm build:varlet` / `pnpm build:tdesign` / `pnpm build:ionic` |
| 构建工作区 / 仅文档 | `pnpm build` / `pnpm build:docs` |
| 检查代码、类型、单测和构建 | `pnpm check` |
| 五套应用的浏览器测试 | `pnpm test:e2e` |
| 重新生成 API 类型 | `pnpm api:generate` |

应用产物位于 `apps/h5-<ui>/dist`，构建目标为 Chrome/Android WebView 111+ 和 Safari/iOS WebView 16.4+。生产托管需配置 SPA 回退和两个后端的路由。

## 仓库结构

| 路径 | 职责 |
| --- | --- |
| `apps/h5-{vant,nutui,varlet,tdesign,ionic}` | 应用外壳、路由表和 UI 框架适配 |
| `packages/mobile-ui` | 共享业务页面和查询 hooks |
| `packages/{api-client,ai-chat}` | REST 契约和流式客户端 |
| `packages/{locales,stores,styles}` | 共享文案、客户端状态和主题样式 |
| `apps/backend-mock` | 仅供开发使用的 Nitro Mock |
| `internal` | 共享构建、Lint 和 TypeScript 配置 |
| `openapi`, `e2e`, `docs` | API 契约、浏览器测试和项目文档 |

## 文档

[在线文档](https://fonghehe.github.io/vue-h5-template/zh/) · [后端模式](./docs/src/zh/guide/essentials/server.md) · [部署](./docs/src/zh/guide/essentials/build.md) · [贡献指南](./CONTRIBUTING.md)

[MIT](./LICENSE)
