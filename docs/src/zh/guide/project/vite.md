# Vite 配置

`internal/vite-config` 提供共享配置工厂。Vite 8 使用 Rolldown，目标为 Chrome 111+、Safari 16.4+。微信/企业微信等内嵌 WebView 需满足对应内核能力，不能保证所有历史版本均兼容。

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: { uiLibrary: 'vant' }, // 'nut' | 'vant' | 'varlet'
  vite: { server: { strictPort: true } },
}));
```

已接入 Vue/JSX、API/组件自动导入、UnoCSS、移动 CSS、HTML/loading 注入及选中的 UI resolver，未启用文件路由。SVG 示例用 eager `import.meta.glob` 和组件 sprite，并非恢复旧 SVG/文件路由插件。

可选开关：`VITE_PWA_ENABLED`、`VITE_IMAGE_OPTIMIZE`、`VITE_DEVTOOLS`、`VITE_ERUDA_ENABLED`、`VITE_VISUALIZER`、`VITE_ARCHIVER`；压缩用 `VITE_COMPRESS=gzip,brotli`。PWA 默认关闭。图片优化仅构建执行，Vant 当前 `.env.production` 已开启。

`VITE_NITRO_MOCK` 区分 Mock/服务模式；目标为 `VITE_MOCK_API_TARGET`、`VITE_API_TARGET`、`VITE_AI_API_TARGET`，先匹配 `/api/ai`。参见[后端接入](../essentials/server.md)，生产构建禁止开启 Nitro。

改源码后执行 `pnpm -F @vh5/vite-config stub` 并重启开发服务。独立检查命令为 `pnpm -F @vh5/vite-config type-check`。完整类型在 `src/typing.ts`，环境转换在 `src/utils/env.ts`，移动样式/预热在 `src/config/application.ts`。
