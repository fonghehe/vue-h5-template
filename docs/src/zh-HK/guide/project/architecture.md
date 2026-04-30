# 系統架構

本文件係 `vue-h5-template` 目標架構嘅**唯一權威說明**，涵蓋系統分層、模組職責同數據流向。

## 1. 設計目標

- **一套業務代碼，三套 UI 皮膚。** NutUI / Vant / Varlet 三個應用共享 100% 嘅業務邏輯、路由、Store 同視圖，只有 UI 適配層唔同。
- **嚴格分層。** UI ⇢ Composables ⇢ Services ⇢ HTTP ⇢ API，每層只向下依賴。
- **領域特性文件夾。** 代碼按*特性*（auth、product、user…）組織，而非按文件類型（`api/`、`store/`、`views/`）。
- **每處邊界均有類型安全。** API DTO、領域模型、路由名稱同 i18n Key 全部帶類型。

## 2. 分層架構

```
┌─────────────────────────────────────────────────────────┐
│                  UI 適配層                               │  ← apps/h5-{nutui,vant,varlet}
│   • 組件庫綁定（NutBtn / VanBtn / …）                    │
│   • 組件庫特有主題同 Locale 注入                          │
│   • 針對組件庫嘅 Vite + UnoCSS 預設                      │
└────────────────────────┬────────────────────────────────┘
                         │ 依賴
┌────────────────────────▼────────────────────────────────┐
│                  應用外殼（App Shell）                   │  ← packages/app-shell
│   • 啟動（createApp、注冊插件、掛載）                     │
│   • 全局錯誤邊界、載入條、進度條                          │
│   • 佈局（BasicLayout：導航欄 + TabBar）                 │
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
│   • 純函數：API DTO → 領域模型                           │
│   • 唔引入任何 Vue / Pinia 依賴                          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  HTTP 客戶端                             │  ← packages/request
│   • 類型化嘅 request<T>() fetch 封裝                     │
│   • 攔截器：Auth Header、Token 刷新、錯誤標準化           │
│   • 取消、重試、超時                                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  API SDK                                 │  ← packages/api
│   • 純接口定義（唔引入 UI / Store）                       │
│   • DTO 類型同接口定義同一文件                            │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────────────┐
│              後端（Mock 或真實）                          │  ← apps/backend-mock
│   • Nitro + JWT，REST 接口均喺 /api/**                   │
└─────────────────────────────────────────────────────────┘
```

**依賴規則**：一個層只能引用其**下方**層嘅代碼。特性模組之間禁止橫向引用——必須通過服務或 `@core/*` 中嘅共享原語。

## 3. 模組職責

| 層          | 套件                                              | 擁有                                            | 可以引用                                           |
| ----------- | ------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| UI 適配層   | `apps/h5-nutui`、`apps/h5-vant`、`apps/h5-varlet` | 組件庫膠水代碼、應用入口、主題配置              | app-shell、features、@core、services、request、api |
| 應用外殼    | `@vh5/app-shell`                                  | 啟動、佈局、Router 實例、全局路由守衛、錯誤邊界 | features、services、request、@core                 |
| 特性模組    | `@vh5/feature-*`                                  | 視圖、路由模組、特性 Store、特性 Composable     | services、@core、locales、request 類型             |
| 領域服務    | `@vh5/services`                                   | 領域模型、轉換函數、業務規則                    | api、@core/base                                    |
| HTTP 客戶端 | `@vh5/request`                                    | 類型化 fetch 封裝、攔截器、錯誤映射             | @core/base                                         |
| API SDK     | `@vh5/api`                                        | 接口 URL、請求/響應 DTO                         | @core/base（只限類型）                             |
| Core Base   | `@vh5/core-base`                                  | tree/date/dom 工具、緩存、常量、`to()`          | （無——純函數）                                     |
| Composables | `@vh5/composables`                                | 與框架無關嘅 Vue Composable                     | @core/base                                         |
| Stores      | `@vh5/stores`                                     | Pinia 初始化 + 持久化插件                       | @core/base                                         |
| Locales     | `@vh5/locales`                                    | i18n 初始化、共享字串                           | @core/base                                         |
| Styles      | `@vh5/styles`                                     | 全局 SCSS、設計 Token、各組件庫樣式覆蓋         | （無）                                             |

## 4. 數據流

### 4.1 讀取流程（以商品詳情為例）

```
View（ProductDetail.vue）
  └─ useProductDetail(id)            ← composable（features/product）
       └─ ProductService.getDetail   ← 服務層：DTO → Product 領域模型
            └─ api.product.detail    ← 接口定義
                 └─ request.get      ← HTTP 層（Auth、重試、錯誤處理）
                      └─ fetch        ← 網絡
```

### 4.2 寫入流程（以登錄為例）

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

- **靜態基礎路由**喺 `@vh5/app-shell/router/base.ts` 中統一定義。
- **每個特性貢獻一個路由模組**，通過 `mergeRouteModules()` 合並。
- **權限過濾**喺單一全局 `beforeEach` 守衛中運行。

## 6. 狀態管理

| 層級           | 位置                         | 係咪持久化 | 示例                         |
| -------------- | ---------------------------- | ---------- | ---------------------------- |
| **服務端緩存** | Composable + `useAsyncState` | 否         | 商品列表、商品詳情           |
| **會話狀態**   | `useAuthStore`（特性）       | 係（AES）  | Access Token、當前用戶、角色 |
| **應用偏好**   | `useAppStore`（app-shell）   | 係         | 語言、主題、最後訪問嘅 Tab   |

## 7. HTTP 層

`@vh5/request` 導出單一 `request` 對象，內置：

- 從 `authStore` 注入 `Authorization: Bearer <token>`
- `401` 時單請求 Token 刷新
- 標準化錯誤：每次失敗都拋出帶有 `code`、`message`、`httpStatus`、`payload` 嘅 `RequestError`
- 通過 `AbortController` 取消請求（Composable 喺 `onScopeDispose` 時自動取消）

## 8. 國際化

- 共享字串（`common.*`、`validation.*`、`error.*`）存放於 `@vh5/locales`。
- 特性專屬字串存放喺特性包內（`packages/features/product/locales/zh-HK.json`），在 bootstrap 時通過 `import.meta.glob` 自動合並。
- 各 UI 組件庫嘅 Locale 由各自嘅適配應用安裝，唔由特性包安裝。

## 9. 錯誤處理

- **HTTP 錯誤**喺 `@vh5/request` 中標準化，暴露為 `RequestError`。
- **服務層錯誤**封裝可恢復嘅業務失敗（如 `InvalidCredentialsError`）。
- **視圖層**對非拋出流程使用 `to()` 工具，對未預期崩潰使用 `@vh5/app-shell` 中嘅全局 `<ErrorBoundary>`。
- **全局 Toast 適配器**由各 UI 組件庫適配應用提供，使 `request` 可以調用 `toast.error()` 而唔與具體組件庫耦合。

## 10. 構建與工具鏈

- **Turborepo** 以跨應用依賴圖編排 `build`、`dev`、`lint`、`typecheck`。
- **`@vh5/vite-config`** 提供 `defineConfig({ application: { uiLibrary } })`；只有適配應用先聲明組件庫名稱。
- **`pnpm` catalog** 集中管理所有第三方依賴版本。
- **`@vh5/tsconfig`** 提供 `web-app.json`（應用）、`library.json`（包）、`node.json`（腳本/內部）供各包繼承。

## 11. 質量門禁

- ESLint + OxLint + Stylelint + Prettier 喺 `lefthook` pre-commit 同 CI 嘅 `turbo lint` 中運行。
- `vitest` 與被測代碼緊鄰存放；`@vh5/core-base` 同 `@vh5/services` 目標行覆蓋率 ≥80%。
- `circular-dependency-scanner` 喺 CI 中運行，強制執行第 2 節嘅分層規則。

另請參閱：

- [目錄結構](./dir.md)
- [路由同導覽](../essentials/route.md)
- [HTTP 同 API 層](../essentials/api.md)
- [狀態管理](../essentials/state.md)
- [新增特性指南](../essentials/contributing-features.md)
