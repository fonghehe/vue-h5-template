# @vh5/stores

## 套件參考

`packages/stores`: `initStores(app, { namespace })`, `resetAllStores()`, `defineStore`, `storeToRefs`.

[完整實作說明](../guide/essentials/state.md)

作為執行期 workspace 依賴。`initStores` 設定預設儲存，但 user/cart 以 localStorage 覆寫；reset 只重置 Pinia。邊界見上方指南。
