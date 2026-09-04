# @vh5/stores

## 包参考

`packages/stores`: `initStores(app, { namespace })`, `resetAllStores()`, `defineStore`, `storeToRefs`.

[完整实现说明](../guide/essentials/state.md)

作为运行时 workspace 依赖安装。`initStores` 配置默认持久化，但当前 user/cart 通过 localStorage 覆盖；`resetAllStores` 只重置 Pinia，Query 与存储边界见上方指南。
