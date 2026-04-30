# 创建应用

使用 CLI 工具快速创建新的 H5 应用。

## 使用方式

```bash
pnpm create-app
```

CLI 会交互式引导你完成：

1. **选择 UI 框架** — Varlet / Vant / NutUI
2. **输入应用名称** — 如 `h5-my-app`

## 生成内容

执行后会在 `apps/` 目录下生成完整的应用结构：

```
apps/h5-my-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── env.d.ts
├── .env
├── .env.development
├── public/
├── src/
│   ├── main.ts
│   ├── bootstrap.ts
│   ├── App.vue
│   ├── router/index.ts
│   ├── views/
│   │   ├── home/index.vue
│   │   ├── list/index.vue
│   │   ├── mine/index.vue
│   │   └── login/index.vue
│   ├── components/
│   ├── layout/index.vue    (从参考应用复制)
│   ├── locales/             (从参考应用复制)
│   ├── api/                 (从参考应用复制)
│   └── stores/              (从参考应用复制)
└── types/
```

## 后续步骤

创建完成后：

1. 运行 `pnpm install` 安装依赖
2. 在根目录 `package.json` 添加启动脚本：

```json
{
  "scripts": {
    "dev:h5-my-app": "pnpm -F @vh5/h5-my-app run dev",
    "build:h5-my-app": "pnpm run build --filter=@vh5/h5-my-app"
  }
}
```

3. 运行 `pnpm dev:h5-my-app` 开始开发

## 自动配置

生成的应用已自动配置：

- **Vite 代理** — `/api` 代理到 Mock 服务 `localhost:5320`
- **共享样式** — 引入 `virtual:uno.css`（UnoCSS）与 `@vh5/styles/global`
- **状态管理** — 使用 `@vh5/stores`（Pinia + 持久化）；namespace 由 `VITE_APP_NAMESPACE` + 版本号 + 环境拼接
- **国际化** — 使用 `@vh5/locales`
- **路由进度条** — 使用 `@vh5/utils` 的 NProgress
- **UI 组件** — 根据选择的框架自动按需注册：
  - **NutUI**：Toast / Notify / Dialog / ImagePreview 的 CSS 在 `bootstrap.ts` 中手动导入，其他组件按需加载
  - **Vant**：组件 CSS 由 `VantResolver` 按需注入，`bootstrap.ts` 无需手动导入全量样式
  - **Varlet**：组件 CSS 由 `VarletImportResolver` 按需加载；函数式组件（如 `Snackbar`）需在使用处手动导入
