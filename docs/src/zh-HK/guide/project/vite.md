# Vite 設定

`internal/vite-config` 提供共享的 Vite 設定產生器。

## 使用

```ts
import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => ({
  application: {
    uiLibrary: "nut", // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    // 自訂 Vite 設定
  },
}));
```
