# 常见问题

## 安装问题

### `pnpm install` 失败

请确保使用了正确的版本：

- Node.js >= 20.12.0
- pnpm >= 10.0.0

```bash
node -v
pnpm -v
```

如果版本过旧，请升级：

```bash
npm i -g corepack
corepack enable
corepack prepare pnpm@latest --activate
```

### 端口被占用

如果默认端口被占用，可以修改对应应用的 `.env.development` 中的 `VITE_PORT`，或直接设置：

```bash
VITE_PORT=3000 pnpm dev:nutui
```

## 开发问题

### Mock 服务不工作

确保 `.env.development` 中设置了 `VITE_NITRO_MOCK=true`。Mock 服务默认运行在端口 `5320`。

### 自动导入不生效

运行一次 `pnpm dev` 生成自动导入的类型声明文件。生成的文件（`auto-imports.d.ts`、`components.d.ts`）应提交到版本控制。

### 如何添加新页面？

1. 在 `src/views/` 中创建 `.vue` 文件
2. 在 `src/router/` 中添加路由
3. 如果页面需要 tabbar 入口，更新 layout 配置

### 如何添加新的 API 接口？

1. 在 `src/api/` 中创建 API 函数
2. 如果使用 mock 数据，在 `apps/backend-mock/api/` 中添加 mock 处理器

## 构建问题

### 构建内存溢出

根目录 `package.json` 已设置 `NODE_OPTIONS=--max-old-space-size=8192`。如果仍然不够，可以增大该值。

### 如何部署到子目录？

在 `.env.production` 中设置 `VITE_BASE`：

```bash
VITE_BASE=/my-app/
```

## 其他

### 如何移除不需要的 UI 框架应用？

1. 删除应用目录（如 `apps/h5-varlet/`）
2. 从根目录 `package.json` 中移除对应的脚本命令
3. 运行 `pnpm install` 更新 workspace

### 如何添加新的共享包？

1. 在 `packages/` 下创建新目录
2. 添加 `package.json` 并使用 `@vh5/` 作用域
3. 在应用中通过 `"@vh5/my-package": "workspace:*"` 引用
