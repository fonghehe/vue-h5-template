# 狀態管理

`vue-h5-template` 嘅狀態分為三層。揀啱層可以保持 Store 精簡，數據流可預測。

## 1. 三層模型

| 層級            | 工具                    | 生命週期   | 係咪持久化 | 示例                             |
| --------------- | ----------------------- | ---------- | ---------- | -------------------------------- |
| 本地 UI 狀態    | `ref` / `reactive`      | 組件內     | 否         | 表單輸入、對話框開關             |
| 服務端緩存      | 特性 Composable + `ref` | 視圖作用域 | 否         | 商品列表、商品詳情               |
| 應用 / 會話狀態 | Pinia Store             | 應用會話   | 係（AES）  | Auth Token、用戶信息、語言、主題 |

**經驗法則**：如果數據只歸屬一個視圖，就唔應該放入 Pinia。

## 2. Pinia 初始化（`@vh5/stores`）

- **開發環境**：持久化到 `localStorage`（便於調試）
- **生產環境**：通過 `secure-ls` 使用 AES 加密 + 壓縮存儲
- Key 格式：`${namespace}-${storeId}`，防止三個 H5 應用之間嘅緩存衝突

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

- Store **調用服務**，唔直接調用 `@vh5/api` 或 `fetch`。
- 用 `persist.pick` 只持久化需要保留嘅字段。
- 退出登錄時通過 `resetAllStores()` 重置所有 Store。

## 4. 應用偏好 Store

跨特性嘅偏好設置存放喺 `@vh5/app-shell/store/app.ts`：

```ts
export const useAppStore = defineStore("app", {
  state: () => ({ locale: "zh-HK", theme: "light" as "light" | "dark" }),
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

## 5. 服務端數据：用 Composable，唔用 Pinia

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
