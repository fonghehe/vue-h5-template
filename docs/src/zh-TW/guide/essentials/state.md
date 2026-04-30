# 狀態管理

`vue-h5-template` 的狀態分為三層。選擇正確的層可以保持 Store 精簡，資料流可預測。

## 1. 三層模型

| 層級            | 工具                    | 生命週期   | 是否持久化 | 範例                               |
| --------------- | ----------------------- | ---------- | ---------- | ---------------------------------- |
| 本地 UI 狀態    | `ref` / `reactive`      | 元件內     | 否         | 表單輸入、對話框開關               |
| 伺服器快取      | 特性 Composable + `ref` | 視圖作用域 | 否         | 商品列表、商品詳情                 |
| 應用 / 會話狀態 | Pinia Store             | 應用會話   | 是（AES）  | Auth Token、使用者資訊、語言、主題 |

**經驗法則**：如果資料只歸屬一個視圖，就不應放入 Pinia。

## 2. Pinia 初始化（`@vh5/stores`）

- **開發環境**：持久化到 `localStorage`（便於除錯）
- **正式環境**：透過 `secure-ls` 使用 AES 加密 + 壓縮儲存
- Key 格式：`${namespace}-${storeId}`，防止三個 H5 應用之間的快取衝突

## 3. 定義特性 Store

```ts
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({ accessToken: "", user: null, roles: [] }),
  getters: {
    isAuthenticated: (s) => !!s.accessToken,
    hasRole: (s) => (role: string) => s.roles.includes(role),
  },
  actions: {
    async login(credentials: Credentials) {
      const session = await AuthService.login(credentials);
      this.$patch({
        accessToken: session.accessToken,
        user: session.user,
        roles: session.user.roles,
      });
    },
    logout() {
      this.$reset();
    },
  },
  persist: { pick: ["accessToken", "user", "roles"] },
});
```

規範：

- Store **呼叫服務**，不直接呼叫 `@vh5/api` 或 `fetch`。
- 使用 `persist.pick` 只持久化需要保留的欄位。
- 登出時透過 `resetAllStores()` 重置所有 Store。

## 4. 應用偏好 Store

跨特性的偏好設定存放於 `@vh5/app-shell/store/app.ts`：

```ts
export const useAppStore = defineStore("app", {
  state: () => ({ locale: "zh-TW", theme: "light" as "light" | "dark" }),
  actions: {
    setLocale(locale: SupportedLanguage) {
      this.locale = locale;
    },
    setTheme(theme: "light" | "dark") {
      this.theme = theme;
    },
  },
  persist: true,
});
```

## 5. 伺服器資料：用 Composable，不用 Pinia

```ts
// ✅ 推薦
const { data, error, loading } = useProductDetail(id);

// ❌ 反模式
productStore.fetchDetail(id);
const data = computed(() => productStore.detail);
```

## 6. 重置狀態

```ts
import { resetAllStores } from "@vh5/stores";

await AuthService.logout();
resetAllStores();
router.replace("/login");
```
