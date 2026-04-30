# 状態管理

`vue-h5-template` の状態は 3 つのティアに分割されています。適切なティアを選ぶことで Store を小さく保ち、データフローを予測可能にします。

## 1. 3 ティアモデル

| ティア                  | ツール                  | ライフタイム     | 永続化      | 例                               |
| ----------------------- | ----------------------- | ---------------- | ----------- | -------------------------------- |
| ローカル UI 状態        | `ref` / `reactive`      | コンポーネント内 | なし        | フォーム入力・ダイアログ開閉     |
| サーバーキャッシュ      | 特性 Composable + `ref` | View スコープ    | なし        | 商品リスト・商品詳細             |
| アプリ / セッション状態 | Pinia Store             | アプリセッション | あり（AES） | Auth Token・ユーザー情報・ロール |

**経験則**：データがただ 1 つの View だけに属するなら Pinia には入れません。

## 2. Pinia 初期化（`@vh5/stores`）

- **開発環境**：`localStorage` に永続化（デバッグしやすい）
- **本番環境**：`secure-ls` で AES 暗号化 + 圧縮
- Key 形式：`${namespace}-${storeId}`（3 アプリ間のキャッシュ衝突を防ぐ）

## 3. 特性 Store の定義

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

ガイドライン：

- Store は**サービスを呼び出します**。`@vh5/api` や `fetch` を直接呼び出しません。
- `persist.pick` で永続化が必要なフィールドのみを選択します。
- ログアウト時は `resetAllStores()` ですべての Store をリセットします。

## 4. アプリ設定 Store

特性横断の設定は `@vh5/app-shell/store/app.ts` に置きます：

```ts
export const useAppStore = defineStore("app", {
  state: () => ({ locale: "ja", theme: "light" as "light" | "dark" }),
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

## 5. サーバーデータは Composable で、Pinia は使わない

```ts
// ✅ 推奨
const { data, error, loading } = useProductDetail(id);

// ❌ アンチパターン
productStore.fetchDetail(id);
const data = computed(() => productStore.detail);
```

## 6. 状態のリセット

```ts
import { resetAllStores } from "@vh5/stores";

await AuthService.logout();
resetAllStores();
router.replace("/login");
```
