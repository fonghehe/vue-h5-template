# 项目结构

详见 [系统架构](./architecture.md) 了解分层规则。

## 1. 顶层概览

```
vue-h5-template/
├── apps/                # 运行时应用（UI 适配器 + Mock 后端）
├── packages/            # 可复用库，按层组织
├── internal/            # 构建时工具（配置、Lint、TS、Vite）
├── scripts/             # CLI 工具（turbo-run、vsh、代码生成器）
└── docs/                # VitePress 文档
```

## 2. `apps/` — UI 适配层

每个 H5 应用是 `@vh5/app-shell` 之上的薄壳，只负责接入一个 UI 组件库。

```
apps/
├── h5-nutui/            # NutUI 适配器          （端口 5777）
├── h5-vant/             # Vant 适配器           （端口 5778）
├── h5-varlet/           # Varlet 适配器         （端口 5779）
└── backend-mock/        # Nitro Mock 服务器     （端口 5320）
```

典型适配应用内容：

```
apps/h5-nutui/
├── vite.config.ts       # defineConfig({ application: { uiLibrary: 'nut' } })
└── src/
    ├── main.ts          # import { startApp } from '@vh5/app-shell'
    ├── ui-adapter.ts    # AppButton → nut-button 等映射
    └── styles.scss      # 仅限组件库主题覆盖
```

**适配应用不应包含**视图、Store、API 调用或路由——这些都在特性包和外壳中。

## 3. `packages/` — 分层库

```
packages/
├── @core/
│   ├── base/            # @vh5/core-base    — 纯工具（tree、date、to…）
│   └── composables/     # @vh5/composables  — Vue Composable
│
├── api/                 # @vh5/api          — 接口声明 + DTO
├── request/             # @vh5/request      — 类型化 fetch 客户端 + 拦截器
├── services/            # @vh5/services     — 领域模型 & 业务规则
│
├── stores/              # @vh5/stores       — Pinia 初始化 + 持久化
├── locales/             # @vh5/locales      — i18n 初始化 + 共享字符串
├── styles/              # @vh5/styles       — 全局 CSS & 设计 Token
├── utils/               # @vh5/utils        — 路由辅助工具
│
├── app-shell/           # @vh5/app-shell    — 启动、布局、路由、守卫
│
└── features/            # 领域特性（一个文件夹 = 一个特性）
    ├── auth/            # @vh5/feature-auth
    ├── user/            # @vh5/feature-user
    ├── product/         # @vh5/feature-product
    └── home/            # @vh5/feature-home
```

### 特性包结构

```
packages/features/product/
└── src/
    ├── index.ts         # 公共入口
    ├── routes.ts        # RouteRecordRaw[]
    ├── store.ts         # 可选 Pinia Store
    ├── composables/
    ├── views/
    ├── components/      # 特性私有组件
    └── locales/
```

## 4. `internal/` — 构建工具

```
internal/
├── tsconfig/            # @vh5/tsconfig     base / web-app / library / node
├── vite-config/         # @vh5/vite-config  defineConfig() 工厂
├── node-utils/          # @vh5/node-utils   fs、git、monorepo 工具
└── lint-configs/
    ├── eslint-config/
    ├── oxlint-config/
    ├── prettier-config/
    ├── stylelint-config/
    └── commitlint-config/
```

## 5. 快速查找表

| 我想添加……              | 放在……                                                          |
| ----------------------- | --------------------------------------------------------------- |
| 新页面                  | `packages/features/<feature>/src/views/`                        |
| 新 API 接口             | `packages/api/src/<domain>.ts` + `services/<domain>.service.ts` |
| 新 Pinia Store          | `packages/features/<feature>/src/store.ts`                      |
| 新共享 Composable       | `packages/@core/composables/src/`                               |
| 新共享工具函数          | `packages/@core/base/shared/src/utils/`                         |
| 新语言字符串            | `packages/features/<feature>/src/locales/<lang>.json`           |
| 新全局样式 / 设计 Token | `packages/styles/src/global/`                                   |
| 新构建插件              | `internal/vite-config/src/plugins/`                             |
| 新 UI 组件库适配应用    | `apps/h5-<lib>/` + 在 `pnpm-workspace.yaml` 中注册              |

## 各 H5 应用页面

每个 H5 应用包含以下页面：

| 路由           | 页面 | 说明                         |
| -------------- | ---- | ---------------------------- |
| `/home`        | 首页 | 项目介绍与技术栈展示         |
| `/list`        | 列表 | 商品列表（从 Mock API 加载） |
| `/details?id=` | 详情 | 商品详情（从 Mock API 加载） |
| `/mine`        | 我的 | 用户信息、登录/登出          |
| `/example`     | 示例 | UI 组件示例                  |
| `/login`       | 登录 | 表单登录（对接 Mock API）    |

## 共享 Vite 配置

`internal/vite-config` 提供 `defineConfig()` 工厂函数，各应用只需声明 UI 库类型：

```ts
// apps/h5-nutui/vite.config.mts
import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => ({
  application: { uiLibrary: "nut" },
  vite: {
    /* 自定义配置 */
  },
}));
```

支持的 `uiLibrary`：`nut`、`vant`、`varlet`

## Pinia 状态持久化

`packages/stores` 提供 `initStores()` 初始化函数：

- 开发环境：使用 `localStorage` 存储
- 生产环境：使用 `SecureLS`（AES 加密）存储
- Key 格式：`${namespace}-${storeId}`
