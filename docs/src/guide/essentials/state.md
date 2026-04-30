# State Management

State in `vue-h5-template` is split into three tiers. Choosing the right tier
keeps stores small and the data flow predictable.

## 1. The Three Tiers

| Tier                | Tool                       | Lifetime    | Persisted | Examples                             |
| ------------------- | -------------------------- | ----------- | --------- | ------------------------------------ |
| Local UI state      | `ref` / `reactive`         | component   | no        | form input, dialog open              |
| Server cache        | feature composable + `ref` | view scope  | no        | product list, product detail         |
| App / session state | Pinia store                | app session | yes (AES) | auth token, user info, locale, theme |

Rule of thumb: **if data is owned by exactly one view, do not use Pinia.**

## 2. Pinia Setup (`@vh5/stores`)

`@vh5/stores` provides `initStores(app, { namespace })` which:

- Creates the Pinia instance
- Installs `pinia-plugin-persistedstate`
- In **development**, persists to `localStorage` (human-readable)
- In **production**, persists through `secure-ls` with AES encryption +
  compression
- Namespaces every key as `${namespace}-${storeId}` to prevent collisions
  between the three H5 apps

```ts
// apps/h5-nutui/src/main.ts
import { initStores } from "@vh5/stores";
await initStores(app, { namespace: `${VITE_APP_NAMESPACE}-${appVersion}-${env}` });
```

## 3. Defining a Feature Store

Each feature owns its store inside its package:

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

  // Selective persistence: never persist transient flags
  persist: {
    pick: ["accessToken", "user", "roles"],
  },
});
```

Guidelines:

- Stores **call services**, never `@vh5/api` and never `fetch`.
- Stores **never import Vue components or i18n instances** — keep them
  testable in isolation.
- Use `persist.pick` to opt-in only the fields that should survive reload.
- Reset stores on logout via `resetAllStores()` from `@vh5/stores`.

## 4. App Preferences Store

Cross-feature preferences live in `@vh5/app-shell/store/app.ts`:

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

## 5. Server Data: Composables, not Stores

Loading product data into Pinia just to read it from one view is an
anti-pattern. Use a composable that owns the lifecycle of the request:

```ts
// good
const { data, error, loading } = useProductDetail(id);

// bad
productStore.fetchDetail(id);
const data = computed(() => productStore.detail);
```

This keeps Pinia free of stale server cache and avoids manual cache
invalidation logic.

## 6. Resetting State

```ts
import { resetAllStores } from "@vh5/stores";

await AuthService.logout();
resetAllStores();
router.replace("/login");
```
