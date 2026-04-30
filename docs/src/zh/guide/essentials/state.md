# 状态管理

`vue-h5-template` 的状态分为三层。选择正确的层可以保持 Store 精简，数据流可预测。

## 1. 三层模型

| 层级            | 工具                    | 生命周期   | 是否持久化 | 示例                             |
| --------------- | ----------------------- | ---------- | ---------- | -------------------------------- |
| 本地 UI 状态    | `ref` / `reactive`      | 组件内     | 否         | 表单输入、对话框开关             |
| 服务端缓存      | 特性 Composable + `ref` | 视图作用域 | 否         | 商品列表、商品详情               |
| 应用 / 会话状态 | Pinia Store             | 应用会话   | 是（AES）  | Auth Token、用户信息、语言、主题 |

经验法则：**如果数据只归属一个视图，就不应放入 Pinia。**

## 2. Pinia 初始化（`@vh5/stores`）

`@vh5/stores` 提供 `initStores(app, { namespace })`，它会：

- 创建 Pinia 实例
- 安装 `pinia-plugin-persistedstate`
- **开发环境**：持久化到 `localStorage`（便于调试）
- **生产环境**：通过 `secure-ls` 使用 AES 加密 + 压缩存储
- 每个 Key 格式为 `${namespace}-${storeId}`，防止三个 H5 应用之间的缓存冲突

```ts
// apps/h5-nutui/src/main.ts
import { initStores } from "@vh5/stores";
await initStores(app, { namespace: `${VITE_APP_NAMESPACE}-${appVersion}-${env}` });
```

## 3. 定义特性 Store

每个特性在其包内管理自己的 Store：

```ts
// packages/features/auth/store.ts
import { defineStore } from "pinia";
import { AuthService } from "@vh5/services";

interface AuthState {
  accessToken: string;
  user: User | null;
  roles: string[];
}

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
    async refresh() {
      const { accessToken } = await AuthService.refresh();
      this.accessToken = accessToken;
    },
    logout() {
      this.$reset();
    },
  },

  // 选择性持久化：不持久化临时标志
  persist: {
    pick: ["accessToken", "user", "roles"],
  },
});
```

规范：

- Store **调用服务**，不直接调用 `@vh5/api`，也不直接调用 `fetch`。
- Store **不引入 Vue 组件或 i18n 实例**——保持可独立测试。
- 使用 `persist.pick` 只持久化需要在页面刷新后保留的字段。
- 退出登录时通过 `@vh5/stores` 的 `resetAllStores()` 重置所有 Store。

## 4. 应用偏好 Store

跨特性的偏好设置存放在 `@vh5/app-shell/store/app.ts`：

```ts
export const useAppStore = defineStore("app", {
  state: () => ({ locale: "zh-CN", theme: "light" as "light" | "dark" }),
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

## 5. 服务端数据：用 Composable，不用 Pinia

把商品数据加载进 Pinia 只为在一个视图中读取，是典型的反模式。应使用 Composable 来管理请求的生命周期：

```ts
// ✅ 推荐
const { data, error, loading } = useProductDetail(id);

// ❌ 反模式
productStore.fetchDetail(id);
const data = computed(() => productStore.detail);
```

这样 Pinia 就不会积累过期的服务端缓存，也不需要手动处理缓存失效逻辑。

## 6. 重置状态

```ts
import { resetAllStores } from "@vh5/stores";

await AuthService.logout();
resetAllStores();
router.replace("/login");
```
