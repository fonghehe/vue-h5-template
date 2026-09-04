# 核心套件（@vh5-core）

`packages/@core/` 下的 `@vh5-core/*` 是專案的底層基礎。依 `packages/@core/README.md` 的說明，該目錄存放「系統一些比較基礎的 SDK 和 UI 組件庫」，後續可能遷移出去或發佈到 npm —— **請勿將任何業務邏輯或業務套件放在該目錄。**

## 套件

### `@vh5-core/design`
設計令牌與 BEM SCSS 工具。
- `.` —— 設計 CSS / 令牌入口（`design.css`）
- `./bem` —— BEM SCSS 輔助（`bem.scss`）

### `@vh5-core/shared`
與框架無關的共享構件。
- `./constants` —— 共享常數
- `./utils` —— 共享工具（基於 `es-toolkit`、`dayjs`、`clsx`、`tailwind-merge` 等）
- `./cache` —— 快取輔助
- `./store` —— 基於 `@tanstack/vue-store` 的輕量 store

### `@vh5-core/typings`
共享的 TypeScript 型別定義。
- `.` —— 核心型別定義
- `./vue-router` —— 與路由相關的型別增強

### `@vh5-core/composables`
可複用的 Vue 3 組合式函式（依賴 `@vueuse/core`、`sortablejs` 與 `@vh5-core/shared`）。

## 與其他套件的關係

其他文件中介紹的使用者態套件 —— `@vh5/stores`、`@vh5/utils`、`@vh5/styles`、`@vh5/locales`、`@vh5/vite-config` —— 都建構在 `@vh5-core/*` 之上。應用通常直接引入上層套件；只有在上游未暴露所需原語時，才直接使用 `@vh5-core/*`。
