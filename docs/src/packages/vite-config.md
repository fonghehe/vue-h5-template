# Vite Config

`internal/vite-config` 提供共享的 Vite 配置生成器。

## 使用

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: {
    uiLibrary: 'nut', // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    // 自定义 Vite 配置
  },
}));
```

## 内置插件

| 插件                       | 说明                |
| -------------------------- | ------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC 支持      |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX 支持        |
| `unplugin-auto-import`     | API 自动导入        |
| `unplugin-vue-components`  | 组件自动注册        |
| `vite-plugin-vue-devtools` | Vue DevTools        |
| `postcss-px-to-viewport`   | px 转 viewport 适配 |
| `vite-plugin-html`         | HTML 模板注入       |
| `vite-plugin-compression`  | Gzip/Brotli 压缩    |
| `vite-plugin-pwa`          | PWA 支持            |
| `nitro-mock`               | Nitro Mock 服务集成 |
| `inject-app-loading`       | 全局 loading 注入   |

## 配置选项

```ts
interface ApplicationPluginOptions {
  uiLibrary?: 'nut' | 'vant' | 'varlet';
  devtools?: boolean;
  compress?: boolean;
  compressTypes?: ('brotli' | 'gzip')[];
  html?: boolean;
  pwa?: boolean;
  nitroMock?: boolean;
  injectAppLoading?: boolean;
  importmap?: boolean;
  archiver?: boolean;
}
```

## 环境变量

通过 `.env.*` 文件配置：

| 变量                      | 说明                 |
| ------------------------- | -------------------- |
| `VITE_PORT`               | 开发服务器端口       |
| `VITE_BASE`               | 基础路径             |
| `VITE_GLOB_API_URL`       | API 请求前缀         |
| `VITE_NITRO_MOCK`         | 是否启用 Mock 服务   |
| `VITE_DEVTOOLS`           | 是否启用 DevTools    |
| `VITE_INJECT_APP_LOADING` | 是否注入全局 loading |
