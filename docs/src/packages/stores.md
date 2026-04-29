# Stores

`packages/stores` provides Pinia state management initialization and persistence.

## Usage

### Initialization

Call `initStores()` in `bootstrap.ts`:

```ts
import { initStores } from '@vh5/stores';

await initStores(app, { namespace: 'my-app-v1-dev' });
```

### Persistence Strategy

- **Development**: Uses `localStorage` directly
- **Production**: Uses `SecureLS` (AES encryption + compression)

Key format: `${namespace}-${storeId}`

### Reset All Stores

```ts
import { resetAllStores } from '@vh5/stores';

resetAllStores();
```
