# 核心套件（@vh5-core）

`packages/@core/` 下的 `@vh5-core/*` 係專案嘅底層基礎。按 `packages/@core/README.md` 嘅說明，該目錄存放「系統一些比較基礎嘅 SDK 同 UI 組件庫」，後續可能遷移出去或者發佈到 npm —— **請勿將任何業務邏輯或者業務套件放喺該目錄。**

## 套件

### `@vh5-core/design`
設計令牌同 BEM SCSS 工具。
- `.` —— 設計 CSS / 令牌入口（`design.css`）
- `./bem` —— BEM SCSS 輔助（`bem.scss`）

### `@vh5-core/shared`
同框架無關嘅共享構件。
- `./constants` —— 共享常數
- `./utils` —— 共享工具（基於 `es-toolkit`、`dayjs`、`clsx`、`tailwind-merge` 等）
- `./cache` —— 快取輔助
- `./store` —— 基於 `@tanstack/vue-store` 嘅輕量 store

### `@vh5-core/typings`
共享嘅 TypeScript 型別定義。
- `.` —— 核心型別定義
- `./vue-router` —— 同路由相關嘅型別增強

### `@vh5-core/composables`
可複用嘅 Vue 3 組合式函式（依賴 `@vueuse/core`、`sortablejs` 同 `@vh5-core/shared`）。

## 同其他套件嘅關係

其他文件入面介紹嘅使用者態套件 —— `@vh5/stores`、`@vh5/utils`、`@vh5/styles`、`@vh5/locales`、`@vh5/vite-config` —— 都建構喺 `@vh5-core/*` 之上。應用通常直接引入上層套件；只有喺上游未暴露所需原語嗰陣，先直接使用 `@vh5-core/*`。
