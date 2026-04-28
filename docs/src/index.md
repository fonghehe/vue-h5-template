---
layout: home
sidebar: false

hero:
  name: Vue H5 Template
  text: Vue 3 移动端 H5 开发模板
  tagline: 基于 Turborepo + Vue 3 + TypeScript 的移动端 Monorepo 模板，开箱即用，支持 NutUI / Vant / Varlet 三套 UI
  actions:
    - theme: brand
      text: 快速开始 ->
      link: /guide/introduction/quick-start
    - theme: alt
      text: 项目介绍
      link: /guide/introduction/about
    - theme: alt
      text: 在 GitHub 查看
      link: https://github.com/fonghehe/vue-h5-template

features:
  - icon: 🏗️
    title: Monorepo 架构
    details: 基于 Turborepo + pnpm workspace，统一管理多个 H5 应用和共享包，构建缓存加速开发。
    link: /guide/project/dir
    linkText: 目录结构
  - icon: 📱
    title: 三套 UI 框架
    details: 分别提供 NutUI、Vant、Varlet 版本，自由选择适合的移动端 UI 组件库。
    link: /apps/nutui
    linkText: 查看应用
  - icon: 🔧
    title: 统一工程配置
    details: 共享 ESLint、Prettier、Stylelint、TypeScript 配置，减少重复，保持团队规范一致。
    link: /guide/project/standard
    linkText: 代码规范
  - icon: 🗄️
    title: Nitro Mock 服务
    details: 内置 Nitro Mock 后端，提供登录认证、商品列表等完整接口模拟，开发无需等待后端。
    link: /apps/backend-mock
    linkText: Mock 文档
  - icon: 📦
    title: 状态管理
    details: Pinia + 持久化插件，生产环境 AES 加密存储，多 Tab 状态同步。
    link: /packages/stores
    linkText: Stores 文档
  - icon: ⚡
    title: Vite 构建
    details: 共享 Vite 配置，支持自动导入、px-to-viewport 移动适配、PWA 等开箱即用。
    link: /guide/project/vite
    linkText: Vite 配置
  - icon: 🌐
    title: 国际化
    details: 内置 vue-i18n，支持简体中文、繁体中文、英文、日文四语言，共享 locales 包跨应用复用。
    link: /guide/essentials/locale
    linkText: 国际化文档
  - icon: 🔒
    title: TypeScript
    details: 全量 TypeScript 覆盖，严格类型检查，完整的类型声明，提升代码可维护性。
    link: /guide/introduction/about
    linkText: 了解更多
---
