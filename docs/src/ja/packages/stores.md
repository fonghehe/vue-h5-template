# Stores

`packages/stores` は Pinia 状態管理の初期化と永続化設定を提供します。

## 使用方法

### 初期化

`bootstrap.ts` で `initStores()` を呼び出します：

```ts
import { initStores } from '@vh5/stores';

await initStores(app, { namespace: 'my-app-v1-dev' });
```

### 永続化戦略

- **開発環境**：`localStorage` を直接使用
- **本番環境**：`SecureLS`（AES 暗号化 + 圧縮）を使用

Key 形式：`${namespace}-${storeId}`

### すべてのストアをリセット

```ts
import { resetAllStores } from '@vh5/stores';

resetAllStores();
```
