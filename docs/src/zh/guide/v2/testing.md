# 测试

## 类型检查与开发启动

`pnpm typecheck` 除应用外，还独立检查 `mobile-ui`、`api-client`、`ai-chat` 和 `vite-config`。Vant 同时检查应用代码及 `tsconfig.node.json`；只检查应用可能掩盖共享包缺少类型扩展的问题。可用 `pnpm -F @vh5/h5-vant type-check` 和 `pnpm -F @vh5/mobile-ui type-check` 单独验证。

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
