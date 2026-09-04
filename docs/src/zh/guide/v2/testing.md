# 测试

## 类型检查与开发启动

`pnpm typecheck` 独立检查三个应用、共享运行时包（utils、stores、locales、core、UI/API/AI）、Mock 后端、Vite 配置和 workspace CLI。每个应用都检查源码及 `tsconfig.node.json`；`tsconfig.tools.json` 检查根目录 Vitest/Playwright 配置和 E2E 代码。包内测试也参与类型检查。新增含源码的包必须提供 `type-check` 脚本，否则递归命令不会检查它。局部验证可用 `pnpm -F @vh5/utils type-check` 或 `pnpm -F @vh5/mobile-ui type-check`。

新增 workspace 包或修改导出后，执行 `pnpm install` 并重启开发服务。Vant 端口被占用时会报错，不再悄悄切换端口。如果旧服务提示 `Failed to resolve import @vh5/mobile-ui/...`，停止该服务，重新执行 `pnpm dev:vant`，然后刷新浏览器。E2E 还会逐页直接访问路由，检查模块 HTTP 错误和未捕获的浏览器异常。

`pnpm test:e2e` 依次运行 Vant、NutUI、Varlet 的共享行为测试，包括 Tab 功能一致性、英中日切换与持久化、320px 商品卡触控尺寸、AI 悬浮入口、Query 分页/变更、登录、Mock API 和 401。应用测试端口为 15778/15777/15779，启动后等待 Nitro API 就绪。可用 `pnpm test:e2e:nutui` 或 `pnpm test:e2e:varlet` 单独执行。

- Vitest + happy-dom：utils、request、stores、composables。
- Vue Test Utils：登录表单、AI Chat Input 与应用错误边界交互。
- Playwright 移动端模拟：首页、登录、Mock API、401、真实 SSE Chat。

```bash
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm check
```

覆盖率门槛从 60% 起步，重点覆盖公共边界而不是凑数字。`pnpm check` 包含 lint、typecheck、unit test 和生产构建。E2E 因需要浏览器和两个本地服务，不默认放进 check，但在 CI 中作为依赖质量任务的独立 Job 执行。

网络状态、Visual Viewport、下拉刷新在 composable 边界测试；购物车测试覆盖数量上限、选择与派生总价。

## 核心回归覆盖

测试覆盖 SSE 的 CRLF/多字节 UTF-8 跨块边界、非法事件、fetch 请求头和失败、逐块响应式更新、停止/清空/重试竞态、Axios 超时/网络/HTTP 错误、Query 分页与语言缓存隔离、购物车数量和金额边界、用户会话，以及下拉刷新失败后的恢复。

`MarkdownContent` 通过文件级 `jsdom` 环境调用真实 DOMPurify，不 Mock 净化过程，也不使用 happy-dom 判断净化是否正确；其他 DOM 组件测试仍使用 happy-dom。jsdom 保持兼容的 29.x，因为 30.x 的 Node 最低要求高于本项目声明。

`vitest.config.ts` 明确纳入核心 API/AI、工具与 composables、部分移动组件/store 和后端工具，包括尚未被测试导入的文件。分支、函数、行、语句的 60% 门槛仅针对这个范围，不代表整站覆盖率。运行 `pnpm test:coverage` 获取当前报告；`pnpm test packages/ai-chat/src/__tests__` 可单独运行流式测试。CI 在质量任务中执行覆盖率检查。
