# 狀態管理 (@vh5/stores)

基於 [Pinia](https://pinia.vuejs.org/) 的共享狀態管理套件。

## 功能

- **useAccessStore**：管理認證 Token
- **useUserStore**：管理使用者資訊、登入登出
- **持久化**：使用 `pinia-plugin-persistedstate` + AES 加密

## 使用

```ts
import { useUserStore } from "@vh5/stores";

const userStore = useUserStore();
await userStore.login({ username: "user", password: "123456" });
```
