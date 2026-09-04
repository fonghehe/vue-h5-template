# 部署

运行 `pnpm build` 构建全部内容，或用 `pnpm build:vant` 等命令构建单一应用。将对应 `dist` 作为支持 History Fallback 的 SPA 部署。真实部署中先把 `/api/ai/**` 路由到 `vue-h5-template-ai-service`，再把其余 `/api/**` 路由到 `vue-h5-template-business-service`。`text/event-stream` 必须关闭代理缓冲和响应转换。

浏览器目标是 Safari 16.4+ 与 Chrome 111+，不引入大范围旧浏览器 Polyfill。

设置 `VITE_PWA_ENABLED=true` 可开启 PWA。Service Worker 只预缓存静态资源和 App Shell，不为 `/api/**` 配置 Runtime Cache。`VITE_IMAGE_OPTIMIZE=true` 只在生产构建压缩 PNG、JPEG、WebP 与 SVG。

生产环境不得开启 Nitro Mock，也不得把 Secret、AI Key 或签名密钥写入 `VITE_*`。建议由部署层配置并验证 CSP、`nosniff`、`Permissions-Policy` 和 `Referrer-Policy`。

微信/企业微信内嵌 WebView 必须满足目标内核能力，不保证旧客户端兼容。旧 Dockerfile 面向 playground，使用前需调整。子目录部署需检查 PWA URL、SPA fallback 和根路径链接。参见[构建与部署边界](../essentials/build.md)。
