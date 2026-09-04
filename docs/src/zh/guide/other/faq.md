# 常见问题

## 安装和模块解析

使用 Node 22.x 的 22.18+ 或 24.x、pnpm 11.10.0。workspace 依赖变化后运行 `pnpm install`。旧服务出现 `Failed to resolve import @vh5/mobile-ui/...` 时，停止旧进程，重启 `pnpm dev:vant`，刷新浏览器。另一个端口的构建/测试通过不等于旧进程已恢复。

## 端口和 Mock

5778 占用时 Vant 会报错；可显式 `VITE_PORT=5788 pnpm dev:vant`。Mock 异常先确认 5320 正在运行什么，插件不会替换已有进程。服务模式需确认业务 8002、AI 8001 已启动，不能默认使用 Nitro 账号。

## Vant 顶栏变白

导入 `@vh5/styles/vant`，导航变量应定义在 `.van-nav-bar`，不能仅靠 `:root`，否则后加载默认样式会覆盖。见[样式](../essentials/styles.md)。

## 类型与修改

运行 `pnpm typecheck`，不是旧 `pnpm check:type`。共享 UI/API/AI/Vite 配置都有独立检查，Vant 同时检查应用及 `tsconfig.node.json`。Vite 生成自动导入声明，路由仍然手写。

## 新增功能与部署

参见[功能指南](../essentials/contributing-features.md)、[后端模式](../essentials/server.md)、[构建](../essentials/build.md)。子目录/PWA 和旧 playground Dockerfile 需要按环境审查。安装失败时不要首先删除 lockfile。
