# 快速开始

## 环境要求

- **Node.js** >= 20.12.0
- **pnpm** >= 10.0.0

## 安装

```bash
# 克隆项目
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# 安装依赖
pnpm install
```

## 开发

```bash
# 启动所有应用（交互式选择）
pnpm dev

# 启动指定应用
pnpm dev:nutui    # NutUI 版
pnpm dev:vant     # Vant 版
pnpm dev:varlet   # Varlet 版
```

Mock 服务会在 `http://localhost:5320` 自动启动（通过 Nitro），前端通过 Vite proxy 代理到 `/api`。

## 构建

```bash
# 构建所有应用
pnpm build

# 构建指定应用
pnpm build:nutui
pnpm build:vant
pnpm build:varlet
```

## 预览

```bash
# 进入应用目录预览
cd apps/h5-nutui
pnpm preview
```

## 清理

```bash
# 清理所有 node_modules、dist、.turbo 缓存
pnpm clean

# 同时删除 lock 文件
pnpm clean --del-lock
```

## 文档开发

```bash
cd docs
pnpm dev
```

## 创建新应用

```bash
# 通过 CLI 交互式创建新的 H5 应用
pnpm create-app
```

支持选择 Varlet / Vant / NutUI，自动生成完整的项目结构。详见 [创建应用](/guide/essentials/create-app)。

## 测试账号

Mock 服务提供以下测试账号：

| 用户名 | 密码   | 角色     |
| ------ | ------ | -------- |
| user   | 123456 | 普通用户 |
| admin  | 123456 | 管理员   |
