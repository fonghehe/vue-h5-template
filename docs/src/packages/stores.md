# @vh5/stores

## Package Reference

`packages/stores`: `initStores(app, { namespace })`, `resetAllStores()`, `defineStore`, `storeToRefs`.

[See the implementation guide](../guide/essentials/state.md)

Register as a runtime workspace dependency. `initStores` configures default persistence; current user/cart stores override it with localStorage. `resetAllStores` only resets Pinia. See the linked guide for Query and storage boundaries.
