# 构建部署

## 构建

```bash
# 构建所有应用
pnpm build

# 构建指定应用
pnpm build:nutui
pnpm build:vant
pnpm build:varlet
```

构建产物输出在各应用的 `dist/` 目录下。

## 预览

```bash
cd apps/h5-nutui
pnpm preview
```

## Docker 部署

项目提供了 Docker 部署配置：

```bash
# Dockerfile 位于 scripts/deploy/
docker build -f scripts/deploy/Dockerfile -t vue-h5-template .
```

Nginx 配置模板位于 `scripts/deploy/nginx.conf`。

## GitHub Pages 自动部署

项目内置 GitHub Actions Workflow，推送 `main` 分支时自动构建并部署文档到 GitHub Pages。

**启用方式**：在仓库 Settings → Pages 中将 Source 设置为 **GitHub Actions**。

```yaml
# .github/workflows/docs.yml
on:
  push:
    branches: [main]
    paths: ["docs/**"]
```

触发条件：push 到 `main` 且 `docs/**` 有变更，或手动触发 `workflow_dispatch`。

## 环境变量

| 变量                      | 说明                 |
| ------------------------- | -------------------- |
| `VITE_PORT`               | 开发服务器端口       |
| `VITE_BASE`               | 基础路径             |
| `VITE_GLOB_API_URL`       | API 请求前缀         |
| `VITE_NITRO_MOCK`         | 是否启用 Mock 服务   |
| `VITE_DEVTOOLS`           | 是否启用 DevTools    |
| `VITE_INJECT_APP_LOADING` | 是否注入全局 loading |
