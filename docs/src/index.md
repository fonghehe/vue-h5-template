---
layout: home
sidebar: false

hero:
  name: Vue H5 Template
  text: Vue 3 Mobile H5 Development Template
  tagline: Monorepo template based on Turborepo + Vue 3 + TypeScript, supporting NutUI / Vant / Varlet
  actions:
    - theme: brand
      text: Get Started ->
      link: /guide/introduction/quick-start
    - theme: alt
      text: Introduction
      link: /guide/introduction/about
    - theme: alt
      text: GitHub
      link: https://github.com/fonghehe/vue-h5-template

features:
  - icon: 🏗️
    title: Monorepo Architecture
    details: Managed with Turborepo + pnpm workspace for multiple H5 apps and shared packages, with build caching to accelerate development.
    link: /guide/project/dir
    linkText: Directory Structure
  - icon: 📱
    title: Three UI Frameworks
    details: Provides NutUI, Vant, and Varlet versions for flexible mobile UI component library choices.
    link: /apps/nutui
    linkText: View Apps
  - icon: 🔧
    title: Unified Configuration
    details: Shared ESLint, Prettier, Stylelint, TypeScript configs to reduce duplication and maintain team consistency.
    link: /guide/project/standard
    linkText: Code Standards
  - icon: 🗄️
    title: Nitro Mock Server
    details: Built-in Nitro mock backend with login authentication, product listing and other complete API simulations.
    link: /apps/backend-mock
    linkText: Mock Docs
  - icon: 📦
    title: State Management
    details: Pinia with persistence plugin, AES encrypted storage in production, multi-tab state synchronization.
    link: /packages/stores
    linkText: Stores Docs
  - icon: ⚡
    title: Vite Build
    details: Shared Vite config with auto-import, mobile viewport adaptation, PWA and more out of the box.
    link: /guide/project/vite
    linkText: Vite Config
  - icon: 🌐
    title: Internationalization
    details: Built-in vue-i18n with Chinese, Traditional Chinese, English, Japanese support, shared locales package across apps.
    link: /guide/essentials/locale
    linkText: I18n Docs
  - icon: 🔒
    title: TypeScript
    details: Full TypeScript coverage with strict type checking and complete type declarations for better maintainability.
    link: /guide/introduction/about
    linkText: Learn More
---
