# 项目更新

## 同步最新代码

```bash
# 获取最新变更
git fetch origin
git pull origin main

# 重新安装依赖（以防 lockfile 有变更）
pnpm install
```

## 依赖更新

```bash
# 检查过时的依赖
pnpm outdated -r

# 交互式更新所有依赖到最新版本
pnpm update -r --interactive --latest
```

## 清理缓存

如果更新后遇到构建问题，尝试清理缓存：

```bash
# 清理所有缓存、node_modules 和 dist
pnpm clean

# 完整重装
pnpm reinstall
```

## 处理破坏性变更

更新依赖的大版本时：

1. 查看 UI 框架迁移指南（NutUI / Vant / Varlet）
2. 查看 Vite 发布说明了解破坏性变更
3. 更新后测试所有三个应用变体
4. 如果插件 API 变更，更新共享 Vite 配置
