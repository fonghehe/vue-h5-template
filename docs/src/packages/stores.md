# Stores

`packages/stores` 提供 Pinia 状态管理的初始化和持久化配置。

## 安装

已作为 workspace 依赖，在 H5 应用的 `package.json` 中引用：

```json
{
  "devDependencies": {
    "@vh5/stores": "workspace:*"
  }
}
```

## 使用

### 初始化

在 `bootstrap.ts` 中调用 `initStores()` 初始化 Pinia：

```ts
import { initStores } from '@vh5/stores';

await initStores(app, { namespace: 'my-app-v1-dev' });
```

### 持久化策略

- **开发环境**：直接使用 `localStorage`
- **生产环境**：使用 `SecureLS`（AES 加密 + 压缩）

Key 格式：`${namespace}-${storeId}`

### 重置所有 Store

```ts
import { resetAllStores } from '@vh5/stores';

resetAllStores();
```

## 导出

```ts
export { defineStore, storeToRefs } from 'pinia';
export { initStores, resetAllStores } from './setup';
```
