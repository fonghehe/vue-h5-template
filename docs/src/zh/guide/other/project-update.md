# 项目维护

## 同步代码

确认当前工作区干净且分支跟踪上游后，执行 `git pull --ff-only`，再运行 `pnpm install --frozen-lockfile`。工作区包或构建配置变更后，重启正在运行的开发服务。

## 更新依赖

用 `pnpm outdated -r` 查看候选更新。修改 `pnpm-workspace.yaml` 中相关 catalog 条目，运行 `pnpm install`，并一起审阅 catalog 与锁文件。工作区内部依赖使用 `workspace:*`。

## 验证变更

运行 `pnpm check`。运行时依赖、导航、请求或构建集成变更后，运行 `pnpm test:e2e`。共享依赖变更时验证五套 UI 应用。

## 重建本地产物

`pnpm clean` 会删除已安装的依赖、构建产物和 Turbo 缓存。清理后使用 `pnpm install --frozen-lockfile` 恢复锁定的依赖。
