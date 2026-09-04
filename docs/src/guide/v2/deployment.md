# Deployment

Run `pnpm build` for all packages/apps or a framework-specific build such as `pnpm build:vant`. Deploy the selected app's `dist` directory as a history-fallback SPA. In a real deployment, route `/api/ai/**` to `vue-h5-template-ai-service` and the remaining `/api/**` traffic to `vue-h5-template-business-service`; register the AI route first. Disable reverse-proxy buffering and transformation for `text/event-stream`.

Browser targets are Safari 16.4+ and Chrome 111+ without broad legacy polyfills.

PWA is optional through `VITE_PWA_ENABLED=true`. The service worker precaches static build assets and the SPA shell. `/api/**` is excluded from the navigation fallback and has no runtime cache rule. Set `VITE_IMAGE_OPTIMIZE=true` to optimize PNG, JPEG, WebP and SVG during production build only.

Never ship `VITE_NITRO_MOCK=true`, secrets, AI keys or production signing keys in frontend environment variables. Recommended response headers include a tested CSP, `X-Content-Type-Options: nosniff`, a restrictive `Permissions-Policy`, and an appropriate `Referrer-Policy`.

Embedded WeChat/WeCom WebViews must meet the target engine capabilities; older clients are not guaranteed. The legacy Dockerfile targets playground and needs adaptation. Subdirectory deployments need a review of PWA URLs, SPA fallback and root-relative links. See [build and deployment boundaries](../essentials/build.md).
