# 介绍

Vue H5 Template 是一个基于 **Turborepo** 的 Vue 3 移动端 H5 开发模板 Monorepo 项目。

## 特性

- **Monorepo 管理** — 使用 Turborepo + pnpm workspace 统一管理多个应用和共享包
- **三套 UI 框架** — 提供 NutUI、Vant、Varlet 三个版本，按需选用
- **TypeScript** — 全面 TypeScript 支持，集成 unplugin-vue-router 类型安全路由
- **Vite** — 基于 Vite 8 构建，支持自动导入、组件自动注册
- **UnoCSS** — 原子化 CSS 引擎，替代传统 CSS 类名
- **Pinia** — 状态管理 + 持久化（生产环境 AES 加密）
- **Mock 后端** — 基于 Nitro 的 Mock 服务，提供登录认证、商品接口
- **Eruda** — 内置移动端调试控制台（仅非生产环境）
- **统一规范** — 共享 ESLint / Prettier / Stylelint / Commitlint 配置
- **动态标题** — 路由切换自动更新页面标题
- **移动端适配** — postcss-mobile-forever 视口适配方案，支持最大宽度限制
- **国际化** — 支持简体中文、繁体中文、英文、日文四种语言

## 技术栈

| 技术                | 版本  | 说明             |
| ------------------- | ----- | ---------------- |
| Vue 3               | 3.5   | 前端框架         |
| TypeScript          | 6.0   | 类型安全         |
| Vite                | 8.0   | 构建工具         |
| UnoCSS              | 66.x  | 原子化 CSS 引擎  |
| Turborepo           | 2.9   | Monorepo 管理    |
| pnpm                | 10.27 | 包管理器         |
| Pinia               | 3.0   | 状态管理         |
| Vue Router          | 5.0   | 路由管理         |
| unplugin-vue-router | 0.19  | 类型安全文件路由 |
| Vue I18n            | 11.3  | 国际化           |
| Nitro               | 2.x   | Mock 服务端      |
| NutUI               | 4.3   | UI 组件库        |
| Vant                | 4.9   | UI 组件库        |
| Varlet              | 3.12  | UI 组件库        |
| VueUse              | 14.x  | 组合式工具集     |
| Eruda               | 3.x   | 移动端调试控制台 |

## 项目结构

```
vue-h5-template/
├── apps/                 # 应用目录
│   ├── h5-nutui/         # NutUI 版 H5 应用（端口 5777）
│   ├── h5-vant/          # Vant 版 H5 应用（端口 5778）
│   ├── h5-varlet/        # Varlet 版 H5 应用（端口 5779）
│   └── backend-mock/     # Nitro Mock 后端
├── packages/             # 共享包
│   ├── @core/            # 核心包（设计系统、composables、偏好设置）
│   ├── locales/          # 国际化语言包
│   ├── stores/           # Pinia 状态管理
│   ├── styles/           # 全局样式
│   └── utils/            # 工具函数
├── internal/             # 内部配置包
│   ├── vite-config/      # 共享 Vite 配置
│   ├── tsconfig/         # 共享 TypeScript 配置
│   └── lint-configs/     # 共享 Lint 配置
├── scripts/              # 构建脚本
└── docs/                 # 文档（本站）
```
