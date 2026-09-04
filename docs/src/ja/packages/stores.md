# @vh5/stores

## パッケージ参照

`packages/stores`: `initStores(app, { namespace })`, `resetAllStores()`, `defineStore`, `storeToRefs`.

[実装ガイド](../guide/essentials/state.md)

実行時 workspace 依存です。`initStores` の既定ストレージを現在の user/cart は localStorage で上書きします。`resetAllStores` は Pinia のみをリセットします。詳細は上記ガイドを参照。
