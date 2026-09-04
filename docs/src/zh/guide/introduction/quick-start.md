# 快速开始

使用 **Node.js 22.x 中的 22.18+ 或 24.x**，以及 **pnpm 11**（`packageManager: pnpm@11.10.0`）。以根 `package.json` 约束为准，旧 Node 20/pnpm 10 说明已失效。

克隆仓库后进入根目录，按需执行下列命令。`pnpm install` 会运行 workspace 的 `stub` 脚本，准备内部构建包。

```bash
pnpm install
pnpm dev:vant
# alternatives: pnpm dev:nutui / pnpm dev:varlet
pnpm check
pnpm test:e2e
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

`pnpm dev` 是交互选择一个包，不是启动全部应用。默认端口：NutUI 5777、Vant 5778、Varlet 5779、Nitro 5320。Mock 账号为 `user / 123456`、`admin / 123456`，仅适用于 Nitro。

页面默认英文，Member 可切换中文、日文。三套应用有相同的业务 Tab 与 AI 悬浮入口。真实后端使用[服务模式](../essentials/server.md)，前端命令不会代替你启动两个配套服务。

从应用 `.env.example` 复制所需值到本地配置，勿覆盖已有设置。新增 workspace 依赖后执行 `pnpm install` 并重启开发服务。Vant 端口占用时会报错；以终端实际输出 URL 为准。

`pnpm build` 包含 workspace 和文档构建，应用输出为 `apps/h5-<ui>/dist`。preview 只是静态预览，不含 Mock 后端。文档用 `pnpm dev:docs` / `pnpm build:docs`。`pnpm create-app` 启动仓库 CLI，参见[创建应用](../essentials/create-app.md)。
