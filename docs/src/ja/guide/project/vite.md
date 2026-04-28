# Vite 設定

`internal/vite-config` が共有 Vite 設定ジェネレーターを提供します。

## 使用方法

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: {
    uiLibrary: 'nut', // 'nut' | 'vant' | 'varlet'
  },
  vite: { /* カスタム設定 */ },
}));
```
