# 项目结构

## 目录说明

```
vue-h5-template/
├── apps/                     # 应用目录
│   ├── h5-nutui/             # NutUI 版 H5
│   │   ├── src/
│   │   │   ├── bootstrap.ts  # 应用引导（初始化 store、路由、动态标题）
│   │   │   ├── main.ts       # 入口文件
│   │   │   ├── App.vue       # 根组件
│   │   │   ├── router/       # 路由配置
│   │   │   ├── store/        # Pinia 用户 Store
│   │   │   ├── layout/       # 布局（导航栏 + TabBar）
│   │   │   └── views/        # 页面组件
│   │   ├── vite.config.mts   # Vite 配置
│   │   └── package.json
│   ├── h5-vant/              # Vant 版（结构同上）
│   ├── h5-varlet/            # Varlet 版（结构同上）
│   └── backend-mock/         # Nitro Mock 后端
│       ├── api/              # API 路由
│       │   ├── auth/         # 认证（登录/登出/刷新）
│       │   ├── user/         # 用户信息
│       │   └── product/      # 商品列表/详情
│       ├── middleware/        # 中间件（CORS）
│       ├── utils/            # 工具（JWT、响应封装、Mock 数据）
│       └── routes/           # 兜底路由
├── packages/                 # 共享包
│   ├── @core/                # 核心包
│   │   ├── base/design/      # 设计 Token
│   │   ├── base/shared/      # 共享工具
│   │   ├── base/typings/     # 类型定义
│   │   ├── composables/      # Vue Composables
│   │   └── preferences/      # 偏好设置系统
│   ├── stores/               # Pinia 初始化 + 持久化
│   ├── locales/              # 国际化语言包
│   ├── styles/               # 全局样式 + UI 库样式入口
│   └── utils/                # 工具函数集合
├── internal/                 # 内部配置
│   ├── vite-config/          # 共享 Vite 配置生成器
│   ├── tsconfig/             # 共享 TypeScript 配置
│   └── lint-configs/         # Lint 配置
│       ├── eslint-config/
│       ├── prettier-config/
│       ├── stylelint-config/
│       └── commitlint-config/
├── scripts/                  # 脚本
│   ├── clean.mjs             # 清理脚本
│   ├── turbo-run/            # 交互式 turbo 命令
│   └── deploy/               # Docker 部署
└── docs/                     # VitePress 文档
```

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
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: { uiLibrary: 'nut' },
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
