# Vite 設定

`internal/vite-config` 提供工廠，使用 Vite 8/Rolldown，目標 Chrome 111+、Safari 16.4+。微信/企業微信 WebView 需符合內核要求，不保證全部舊版本。

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: { uiLibrary: 'vant' }, // 'nut' | 'vant' | 'varlet'
  vite: { server: { strictPort: true } },
}));
```

接入 Vue/JSX、自動匯入、UnoCSS、viewport CSS、HTML/loading 與單一 UI resolver。未啟用檔案路由。SVG 使用 eager `import.meta.glob` 與元件 sprite，不是旧插件。

可選 env：`VITE_PWA_ENABLED`、`VITE_IMAGE_OPTIMIZE`、`VITE_DEVTOOLS`、`VITE_ERUDA_ENABLED`、`VITE_VISUALIZER`、`VITE_ARCHIVER`；壓縮 `VITE_COMPRESS=gzip,brotli`。PWA 預設關閉；圖片優化僅 build，Vant `.env.production` 已開啟。

`VITE_NITRO_MOCK` 選擇模式；代理使用 `VITE_MOCK_API_TARGET`、`VITE_API_TARGET`、`VITE_AI_API_TARGET` 並先匹配 `/api/ai`。見[後端](../essentials/server.md)。正式構建禁止開啟 Nitro。

修改後 `pnpm -F @vh5/vite-config stub` 並重啟。型別檢查用 `pnpm -F @vh5/vite-config type-check`。型別、env、CSS 分別在 `src/typing.ts`、`src/utils/env.ts`、`src/config/application.ts`。
