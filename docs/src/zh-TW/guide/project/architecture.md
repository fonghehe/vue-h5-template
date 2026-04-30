# 系統架構

本文件是 `vue-h5-template` 目標架構的**唯一權威說明**，涵蓋系統分層、模組職責與資料流向。

## 1. 設計目標

- **一套業務程式碼，三套 UI 外觀。** NutUI / Vant / Varlet 三個應用共享 100% 的業務邏輯、路由、Store 與視圖，只有 UI 適配層不同。
- **嚴格分層。** UI ⇢ Composables ⇢ Services ⇢ HTTP ⇢ API，每層僅向下依賴。
- **領域特性資料夾。** 程式碼按*特性*（auth、product、user…）組織，而非按檔案類型（`api/`、`store/`、`views/`）。
- **每處邊界均有型別安全。** API DTO、領域模型、路由名稱與 i18n Key 全部帶型別。

## 2. 分層架構

```
┌─────────────────────────────────────────────────────────┐
│                  UI 適配層                               │  ← apps/h5-{nutui,vant,varlet}
│   • 元件庫綁定（NutBtn / VanBtn / …）                    │
│   • 元件庫特有主題與 Locale 注入                          │
│   • 針對元件庫的 Vite + UnoCSS 預設                      │
└────────────────────────┬────────────────────────────────┘
                         │ 依賴
┌────────────────────────▼────────────────────────────────┐
│                  應用外殼（App Shell）                   │  ← packages/app-shell
│   • 啟動（createApp、註冊插件、掛載）                     │
│   • 全域錯誤邊界、載入列、進度條                          │
│   • 版面配置（BasicLayout：導覽列 + TabBar）              │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  特性模組（Feature Modules）             │  ← packages/features/*
│   features/auth    features/product   features/user      │
│   ├ views/         ├ views/           ├ views/           │
│   ├ composables/   ├ composables/     ├ composables/     │
│   ├ store.ts       ├ store.ts         ├ store.ts         │
│   └ index.ts（路由）└ index.ts        └ index.ts         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  領域服務（Domain Services）             │  ← packages/services
│   • AuthService、ProductService、UserService             │
│   • 純函式：API DTO → 領域模型                           │
│   • 不引入任何 Vue / Pinia 依賴                          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  HTTP 客戶端                             │  ← packages/request
│   • 型別化的 request<T>() fetch 封裝                     │
│   • 攔截器：Auth Header、Token 刷新、錯誤標準化           │
│   • 取消、重試、逾時                                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  API SDK                                 │  ← packages/api
│   • 純介面定義（不引入 UI / Store）                       │
│   • DTO 型別與介面定義同一檔案                            │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────────────┐
│              後端（Mock 或真實）                          │  ← apps/backend-mock
│   • Nitro + JWT，REST 介面均在 /api/**                   │
└─────────────────────────────────────────────────────────┘
```

**依賴規則**：一個層只能引用其**下方**層的程式碼。特性模組之間禁止橫向引用——必須透過服務或 `@core/*` 中的共享原語。

## 3. 模組職責

| 層          | 套件                                              | 擁有                                                | 可以引用                                           |
| ----------- | ------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| UI 適配層   | `apps/h5-nutui`、`apps/h5-vant`、`apps/h5-varlet` | 元件庫膠水程式碼、應用入口、主題設定                | app-shell、features、@core、services、request、api |
| 應用外殼    | `@vh5/app-shell`                                  | 啟動、版面配置、Router 實例、全域路由守衛、錯誤邊界 | features、services、request、@core                 |
| 特性模組    | `@vh5/feature-*`                                  | 視圖、路由模組、特性 Store、特性 Composable         | services、@core、locales、request 型別             |
| 領域服務    | `@vh5/services`                                   | 領域模型、轉換函式、業務規則                        | api、@core/base                                    |
| HTTP 客戶端 | `@vh5/request`                                    | 型別化 fetch 封裝、攔截器、錯誤映射                 | @core/base                                         |
| API SDK     | `@vh5/api`                                        | 介面 URL、請求/響應 DTO                             | @core/base（僅型別）                               |
| Core Base   | `@vh5/core-base`                                  | tree/date/dom 工具、快取、常數、`to()`              | （無——純函式）                                     |
| Composables | `@vh5/composables`                                | 與框架無關的 Vue Composable                         | @core/base                                         |
| Stores      | `@vh5/stores`                                     | Pinia 初始化 + 持久化插件                           | @core/base                                         |
| Locales     | `@vh5/locales`                                    | i18n 初始化、共享字串                               | @core/base                                         |
| Styles      | `@vh5/styles`                                     | 全域 SCSS、設計 Token、各元件庫樣式覆寫             | （無）                                             |

## 4. 資料流

### 4.1 讀取流程（以商品詳情為例）

```
View（ProductDetail.vue）
  └─ useProductDetail(id)            ← composable（features/product）
       └─ ProductService.getDetail   ← 服務層：DTO → Product 領域模型
            └─ api.product.detail    ← 介面定義
                 └─ request.get      ← HTTP 層（Auth、重試、錯誤處理）
                      └─ fetch        ← 網路
```

### 4.2 寫入流程（以登入為例）

```
LoginView
  └─ authStore.login(credentials)
       └─ AuthService.login(credentials)
            └─ api.auth.login(payload)
                 └─ request.post
       └─ 成功後：authStore.setSession(token, user)
       └─ router.replace(redirectTo)
```

## 5. 路由

- **靜態基礎路由**在 `@vh5/app-shell/router/base.ts` 中統一定義。
- **每個特性貢獻一個路由模組**，透過 `mergeRouteModules()` 合併。
- **權限過濾**在單一全域 `beforeEach` 守衛中執行。

## 6. 狀態管理

| 層級           | 位置                         | 是否持久化 | 範例                           |
| -------------- | ---------------------------- | ---------- | ------------------------------ |
| **伺服器快取** | Composable + `useAsyncState` | 否         | 商品列表、商品詳情             |
| **會話狀態**   | `useAuthStore`（特性）       | 是（AES）  | Access Token、目前使用者、角色 |
| **應用偏好**   | `useAppStore`（app-shell）   | 是         | 語言、主題、最後造訪的 Tab     |

## 7. HTTP 層

`@vh5/request` 匯出單一 `request` 物件，內建：

- 從 `authStore` 注入 `Authorization: Bearer <token>`
- `401` 時單次請求 Token 刷新
- 標準化錯誤：每次失敗均拋出帶有 `code`、`message`、`httpStatus`、`payload` 的 `RequestError`
- 透過 `AbortController` 取消請求（Composable 在 `onScopeDispose` 時自動取消）

## 8. 國際化

- 共享字串（`common.*`、`validation.*`、`error.*`）存放於 `@vh5/locales`。
- 特性專屬字串存放在特性套件內（`packages/features/product/locales/zh-TW.json`），在 bootstrap 時透過 `import.meta.glob` 自動合併。
- 各 UI 元件庫的 Locale 由各自的適配應用安裝，不由特性套件安裝。

## 9. 錯誤處理

- **HTTP 錯誤**在 `@vh5/request` 中標準化，暴露為 `RequestError`。
- **服務層錯誤**封裝可恢復的業務失敗（如 `InvalidCredentialsError`）。
- **視圖層**對非拋出流程使用 `to()` 工具，對未預期當機使用 `@vh5/app-shell` 中的全域 `<ErrorBoundary>`。
- **全域 Toast 配接器**由各 UI 元件庫適配應用提供，使 `request` 可呼叫 `toast.error()` 而不與特定元件庫耦合。

## 10. 建置與工具鏈

- **Turborepo** 以跨應用相依圖編排 `build`、`dev`、`lint`、`typecheck`。
- **`@vh5/vite-config`** 提供 `defineConfig({ application: { uiLibrary } })`；只有適配應用才宣告元件庫名稱。
- **`pnpm` catalog** 集中管理所有第三方相依版本。
- **`@vh5/tsconfig`** 提供 `web-app.json`（應用）、`library.json`（套件）、`node.json`（腳本/內部）供各套件繼承。

## 11. 品質關卡

- ESLint + OxLint + Stylelint + Prettier 在 `lefthook` pre-commit 及 CI 的 `turbo lint` 中執行。
- `vitest` 與被測程式碼緊鄰存放；`@vh5/core-base` 與 `@vh5/services` 目標行覆蓋率 ≥80%。
- `circular-dependency-scanner` 在 CI 中執行，強制執行第 2 節的分層規則。

另請參閱：

- [目錄結構](./dir.md)
- [路由與導覽](../essentials/route.md)
- [HTTP 與 API 層](../essentials/api.md)
- [狀態管理](../essentials/state.md)
- [新增特性指南](../essentials/contributing-features.md)
