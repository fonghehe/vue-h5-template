# Vite Configuration

`internal/vite-config` supplies the shared config factory. Vite 8 uses Rolldown; target browsers are Chrome 111+ and Safari 16.4+. An embedded WebView must meet those engine capabilities; there is no blanket guarantee for all WeChat/WeCom versions.

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: { uiLibrary: 'vant' }, // 'nut' | 'vant' | 'varlet'
  vite: { server: { strictPort: true } },
}));
```

Active integrations include Vue/JSX, API/component auto-import, UnoCSS, mobile viewport CSS, HTML/loading injection, and the selected UI resolver. File routing is not enabled. SVG examples use eager `import.meta.glob` and a component sprite, not a restored file-router or SVG plugin.

Optional env switches: `VITE_PWA_ENABLED`, `VITE_IMAGE_OPTIMIZE`, `VITE_DEVTOOLS`, `VITE_ERUDA_ENABLED`, `VITE_VISUALIZER`, `VITE_ARCHIVER`; compression takes `VITE_COMPRESS=gzip,brotli`. PWA is off by default. Image optimization runs only during build; Vant's `.env.production` currently enables it.

`VITE_NITRO_MOCK` selects Mock/service mode. Proxy targets are `VITE_MOCK_API_TARGET`, `VITE_API_TARGET`, `VITE_AI_API_TARGET`, with `/api/ai` matched first. See [backend setup](../essentials/server.md). Never enable Nitro in production builds.

After editing this source run `pnpm -F @vh5/vite-config stub`, then restart affected dev servers. `pnpm -F @vh5/vite-config type-check` checks the config package independently. Full definitions are in `src/typing.ts`, env conversion in `src/utils/env.ts`, mobile CSS/warmup in `src/config/application.ts`.
