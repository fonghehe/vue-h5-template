# 系统架构

本文档是 `vue-h5-template` 目标架构的**唯一权威说明**，涵盖系统分层、模块职责与数据流向。

## 1. 设计目标

- **一套业务代码，三套 UI 皮肤。** NutUI / Vant / Varlet 三个应用共享 100% 的业务逻辑、路由、Store 和视图，只有 UI 适配层不同。
- **严格分层。** UI ⇢ Composables ⇢ Services ⇢ HTTP ⇢ API，每层仅向下依赖。
- **领域特性文件夹。** 代码按*特性*（auth、product、user…）组织，而非按文件类型（`api/`、`store/`、`views/`）。
- **每处边界均有类型安全。** API DTO、领域模型、路由名称与 i18n Key 全部带类型。

## 2. 分层架构

```
┌─────────────────────────────────────────────────────────┐
│                  UI 适配层                               │  ← apps/h5-{nutui,vant,varlet}
│   • 组件库绑定（NutBtn / VanBtn / …）                    │
│   • 组件库特有的主题与 Locale 注入                        │
│   • 针对组件库的 Vite + UnoCSS 预设                      │
└────────────────────────┬────────────────────────────────┘
                         │ 依赖
┌────────────────────────▼────────────────────────────────┐
│                  应用外壳（App Shell）                   │  ← packages/app-shell
│   • 启动（createApp、注册插件、挂载）                     │
│   • 全局错误边界、加载条、进度条                          │
│   • 布局（BasicLayout：导航栏 + TabBar）                 │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  特性模块（Feature Modules）             │  ← packages/features/*
│   features/auth    features/product   features/user      │
│   ├ views/         ├ views/           ├ views/           │
│   ├ composables/   ├ composables/     ├ composables/     │
│   ├ store.ts       ├ store.ts         ├ store.ts         │
│   └ index.ts（路由）└ index.ts        └ index.ts         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  领域服务（Domain Services）             │  ← packages/services
│   • AuthService、ProductService、UserService             │
│   • 纯函数：API DTO → 领域模型                           │
│   • 不引入任何 Vue / Pinia 依赖                          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  HTTP 客户端                             │  ← packages/request
│   • 类型化的 request<T>() fetch 封装                     │
│   • 拦截器：Auth Header、Token 刷新、错误标准化           │
│   • 取消、重试、超时                                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  API SDK                                 │  ← packages/api
│   • 纯接口定义（不引入 UI / Store）                       │
│   • DTO 类型与接口定义同文件                              │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────────────┐
│              后端（Mock 或真实）                          │  ← apps/backend-mock
│   • Nitro + JWT，REST 接口均在 /api/**                   │
└─────────────────────────────────────────────────────────┘
```

**依赖规则**：一个层只能引用其**下方**层的代码。特性模块之间禁止横向引用——必须通过服务或 `@core/*` 中的共享原语。

## 3. 模块职责

| 层          | 包                                                | 拥有                                            | 可以引用                                           |
| ----------- | ------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| UI 适配层   | `apps/h5-nutui`、`apps/h5-vant`、`apps/h5-varlet` | 组件库胶水代码、应用入口、主题配置              | app-shell、features、@core、services、request、api |
| 应用外壳    | `@vh5/app-shell`                                  | 启动、布局、Router 实例、全局路由守卫、错误边界 | features、services、request、@core                 |
| 特性模块    | `@vh5/feature-*`                                  | 视图、路由模块、特性 Store、特性 Composable     | services、@core、locales、request 类型             |
| 领域服务    | `@vh5/services`                                   | 领域模型、转换函数、业务规则                    | api、@core/base                                    |
| HTTP 客户端 | `@vh5/request`                                    | 类型化 fetch 封装、拦截器、错误映射             | @core/base                                         |
| API SDK     | `@vh5/api`                                        | 接口 URL、请求/响应 DTO                         | @core/base（仅类型）                               |
| Core Base   | `@vh5/core-base`                                  | tree/date/dom 工具、缓存、常量、`to()`          | （无——纯函数）                                     |
| Composables | `@vh5/composables`                                | 与框架无关的 Vue Composable                     | @core/base                                         |
| Stores      | `@vh5/stores`                                     | Pinia 初始化 + 持久化插件                       | @core/base                                         |
| Locales     | `@vh5/locales`                                    | i18n 初始化、共享字符串                         | @core/base                                         |
| Styles      | `@vh5/styles`                                     | 全局 SCSS、设计 Token、各组件库样式覆盖         | （无）                                             |

## 4. 数据流

### 4.1 读取流程（以商品详情为例）

```
View（ProductDetail.vue）
  └─ useProductDetail(id)            ← composable（features/product）
       └─ ProductService.getDetail   ← 服务层：DTO → Product 领域模型
            └─ api.product.detail    ← 接口定义
                 └─ request.get      ← HTTP 层（Auth、重试、错误处理）
                      └─ fetch        ← 网络
```

视图层是纯声明式的，从不直接调用 `fetch` 或 API SDK。

### 4.2 写入流程（以登录为例）

```
LoginView
  └─ authStore.login(credentials)
       └─ AuthService.login(credentials)
            └─ api.auth.login(payload)
                 └─ request.post
       └─ 成功后：authStore.setSession(token, user)
       └─ router.replace(redirectTo)
```

副作用（Token 持久化、页面跳转、Toast 提示）由特性 Store 负责，而非视图。

## 5. 路由

- **静态基础路由**在 `@vh5/app-shell/router/base.ts` 中统一定义（login、404、403）。
- **每个特性贡献一个路由模块**，从其包入口导出 `routes: RouteRecordRaw[]`，通过 `@vh5/utils` 的 `mergeRouteModules()` 合并。
- **权限过滤**在单一全局 `beforeEach` 守卫中运行：
  1. 从 `authStore` 解析当前会话。
  2. 未登录且路由为私有 → 重定向 `/login?redirect=…`。
  3. 调用 `generateRoutesByFrontend(routes, roles)` 按 `meta.authority` 过滤。
- **后端驱动路由**（可选）由 `generateRoutesByBackend()` 支持。

`unplugin-vue-router` 继续提供类型化路由名称；特性视图通过 `<route>` 块注册 `meta`。

## 6. 状态管理

三层清晰区分：

| 层级           | 位置                         | 是否持久化 | 示例                         |
| -------------- | ---------------------------- | ---------- | ---------------------------- |
| **服务端缓存** | Composable + `useAsyncState` | 否         | 商品列表、商品详情           |
| **会话状态**   | `useAuthStore`（特性）       | 是（AES）  | Access Token、当前用户、角色 |
| **应用偏好**   | `useAppStore`（app-shell）   | 是         | 语言、主题、最后访问的 Tab   |

## 7. HTTP 层

`@vh5/request` 导出单一 `request` 对象，内置：

- 从 `authStore` 注入 `Authorization: Bearer <token>`
- `401` 时单请求 Token 刷新
- 标准化错误：每次失败都抛出带有 `code`、`message`、`httpStatus`、`payload` 的 `RequestError`
- 通过 `AbortController` 取消请求（Composable 在 `onScopeDispose` 时自动取消）

## 8. 国际化

- 共享字符串（`common.*`、`validation.*`、`error.*`）存放于 `@vh5/locales`。
- 特性专属字符串存放在特性包内（`packages/features/product/locales/zh-CN.json`），在 bootstrap 时通过 `import.meta.glob` 自动合并。
- 各 UI 组件库的 Locale（NutUI / Vant / Varlet）由各自的适配应用安装，不由特性包安装。

## 9. 错误处理

- **HTTP 错误**在 `@vh5/request` 中标准化，暴露为 `RequestError`。
- **服务层错误**封装可恢复的业务失败（如 `InvalidCredentialsError`）。
- **视图层**对非抛出流程使用 `to()` 工具，对未预期崩溃使用 `@vh5/app-shell` 中的全局 `<ErrorBoundary>`。
- **全局 Toast 适配器**由各 UI 组件库适配应用提供，使 `request` 可以调用 `toast.error()` 而不与具体组件库耦合。

## 10. 构建与工具链

- **Turborepo** 以 `pnpm-workspace.yaml` 中的跨应用依赖图编排 `build`、`dev`、`lint`、`typecheck`。
- **`@vh5/vite-config`** 提供 `defineConfig({ application: { uiLibrary } })`；只有适配应用才声明组件库名称。
- **`pnpm` catalog** 集中管理所有三方依赖版本。
- **`@vh5/tsconfig`** 提供 `web-app.json`（应用）、`library.json`（包）、`node.json`（脚本/内部）供各包继承。

## 11. 质量门禁

- ESLint + OxLint + Stylelint + Prettier 在 `lefthook` pre-commit 和 CI 的 `turbo lint` 中运行。
- `vitest` 与被测代码紧邻存放；`@vh5/core-base` 和 `@vh5/services` 目标行覆盖率 ≥80%。
- `circular-dependency-scanner` 在 CI 中运行，强制执行第 2 节的分层规则。

另请参阅：

- [目录结构](./dir.md)
- [路由与导航](../essentials/route.md)
- [HTTP 与 API 层](../essentials/api.md)
- [状态管理](../essentials/state.md)
- [新增特性指南](../essentials/contributing-features.md)
