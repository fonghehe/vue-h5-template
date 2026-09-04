# 核心包（@vh5-core）

`packages/@core/` 下的 `@vh5-core/*` 是项目的底层基础。按 `packages/@core/README.md` 的说明，该目录存放「系统一些比较基础的 SDK 和 UI 组件库」，后续可能迁移出去或发布到 npm —— **请勿将任何业务逻辑或业务包放在该目录。**

## 包

### `@vh5-core/design`
设计令牌与 BEM SCSS 工具。
- `.` —— 设计 CSS / 令牌入口（`design.css`）
- `./bem` —— BEM SCSS 辅助（`bem.scss`）

### `@vh5-core/shared`
与框架无关的共享构件。
- `./constants` —— 共享常量
- `./utils` —— 共享工具（基于 `es-toolkit`、`dayjs`、`clsx`、`tailwind-merge` 等）
- `./cache` —— 缓存辅助
- `./store` —— 基于 `@tanstack/vue-store` 的轻量 store

### `@vh5-core/typings`
共享的 TypeScript 类型定义。
- `.` —— 核心类型定义
- `./vue-router` —— 与路由相关的类型增强

### `@vh5-core/composables`
可复用的 Vue 3 组合式函数（依赖 `@vueuse/core`、`sortablejs` 与 `@vh5-core/shared`）。

## 与其他包的关系

其他文档中介绍的用户态包 —— `@vh5/stores`、`@vh5/utils`、`@vh5/styles`、`@vh5/locales`、`@vh5/vite-config` —— 都构建在 `@vh5-core/*` 之上。应用通常直接引入上层包；只有在上游未暴露所需原语时，才直接使用 `@vh5-core/*`。
