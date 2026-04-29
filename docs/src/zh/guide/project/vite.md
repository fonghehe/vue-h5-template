# Vite 配置

`internal/vite-config` 提供共享的 Vite 配置生成器。

## 使用

```ts
import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => ({
  application: {
    uiLibrary: "nut", // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    // 自定义 Vite 配置
  },
}));
```

## 内置插件

| 插件                       | 说明                    |
| -------------------------- | ----------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC 支持          |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX 支持            |
| `unplugin-auto-import`     | API 自动导入            |
| `unplugin-vue-components`  | 组件按需自动注册        |
| `unplugin-vue-router`      | 类型安全文件路由        |
| `unocss`                   | 原子化 CSS 引擎         |
| `vite-plugin-eruda-pro`    | 移动端调试控制台（dev） |
| `vite-plugin-vue-devtools` | Vue DevTools            |
| `postcss-mobile-forever`   | 移动端视口适配          |
| `vite-plugin-html`         | HTML 模板注入           |
| `vite-plugin-compression`  | Gzip/Brotli 压缩        |
| `vite-plugin-pwa`          | PWA 支持                |
| `nitro-mock`               | Nitro Mock 服务         |

## 按需加载配置

通过 `uiLibrary` 选项自动配置对应的 Resolver：

| UI 库  | Component Resolver     | Auto Import Resolver                         | importStyle        |
| ------ | ---------------------- | -------------------------------------------- | ------------------ |
| vant   | `VantResolver`         | `VantResolver`                               | `false`（全量CSS） |
| varlet | `VarletImportResolver` | `VarletImportResolver({ autoImport: true })` | 自动               |
| nutui  | `NutUIResolver`        | —                                            | 自动               |

## 配置选项

```ts
interface ApplicationPluginOptions {
  uiLibrary?: "nut" | "vant" | "varlet";
  devtools?: boolean;
  compress?: boolean;
  compressTypes?: ("brotli" | "gzip")[];
  html?: boolean;
  pwa?: boolean;
  injectAppLoading?: boolean;
  nitroMock?: boolean;
}
```
