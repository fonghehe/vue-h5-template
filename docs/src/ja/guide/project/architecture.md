# システムアーキテクチャ

このドキュメントは `vue-h5-template` の目標アーキテクチャに関する**唯一の権威ある説明**です。システムのレイヤー構造、モジュールの責務、データフローを網羅しています。

## 1. 設計目標

- **1 つのビジネスコードベース、3 つの UI スキン。** NutUI / Vant / Varlet の 3 アプリは、ビジネスロジック・ルーティング・Store・View を 100% 共有し、UI アダプター層のみが異なります。
- **厳格なレイヤー構造。** UI ⇢ Composables ⇢ Services ⇢ HTTP ⇢ API。各レイヤーは下方向のみに依存します。
- **ドメイン特性フォルダ。** コードはファイルタイプ（`api/`、`store/`、`views/`）ではなく、_特性_（auth、product、user…）で整理されます。
- **すべての境界で型安全。** API DTO、ドメインモデル、ルート名、i18n キーはすべて型付きです。

## 2. レイヤーアーキテクチャ

```
┌─────────────────────────────────────────────────────────┐
│                  UI アダプター層                          │  ← apps/h5-{nutui,vant,varlet}
│   • コンポーネントライブラリバインディング                 │
│   • ライブラリ固有のテーマと Locale 注入                  │
│   • ライブラリ向け Vite + UnoCSS プリセット               │
└────────────────────────┬────────────────────────────────┘
                         │ 依存
┌────────────────────────▼────────────────────────────────┐
│                  アプリケーションシェル                   │  ← packages/app-shell
│   • ブートストラップ（createApp・プラグイン登録・マウント）│
│   • グローバルエラーバウンダリ・ローディング・プログレスバー│
│   • レイアウト（BasicLayout：ナビバー + タブバー）         │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                  特性モジュール（Feature Modules）        │  ← packages/features/*
│   features/auth    features/product   features/user      │
│   ├ views/         ├ views/           ├ views/           │
│   ├ composables/   ├ composables/     ├ composables/     │
│   ├ store.ts       ├ store.ts         ├ store.ts         │
│   └ index.ts（ルート）└ index.ts      └ index.ts         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  ドメインサービス（Domain Services）      │  ← packages/services
│   • AuthService・ProductService・UserService             │
│   • 純粋関数：API DTO → ドメインモデル                   │
│   • Vue / Pinia の依存なし                               │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  HTTP クライアント                        │  ← packages/request
│   • 型付き request<T>() fetch ラッパー                   │
│   • インターセプター：Auth Header・Token 更新・エラー正規化│
│   • キャンセル・リトライ・タイムアウト                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  API SDK                                 │  ← packages/api
│   • 純粋なエンドポイント定義（UI / Store 依存なし）        │
│   • DTO 型とエンドポイントを同ファイルに配置               │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────────────────────┐
│              バックエンド（Mock または本物）              │  ← apps/backend-mock
│   • Nitro + JWT、REST エンドポイントは /api/**            │
└─────────────────────────────────────────────────────────┘
```

**依存ルール**：各レイヤーは**下方向**のレイヤーのみをインポートできます。特性モジュール間の横断インポートは禁止です。サービスまたは `@core/*` の共有プリミティブを経由してください。

## 3. モジュールの責務

| レイヤー          | パッケージ                                        | 所有するもの                                                                          | インポート可能                                     |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------- |
| UI アダプター     | `apps/h5-nutui`・`apps/h5-vant`・`apps/h5-varlet` | コンポーネントライブラリグルーコード・アプリエントリー・テーマ                        | app-shell・features・@core・services・request・api |
| アプリシェル      | `@vh5/app-shell`                                  | ブートストラップ・レイアウト・Router インスタンス・グローバルガード・エラーバウンダリ | features・services・request・@core                 |
| 特性モジュール    | `@vh5/feature-*`                                  | View・ルートモジュール・特性 Store・特性 Composable                                   | services・@core・locales・request 型               |
| ドメインサービス  | `@vh5/services`                                   | ドメインモデル・変換関数・ビジネスルール                                              | api・@core/base                                    |
| HTTP クライアント | `@vh5/request`                                    | 型付き fetch ラッパー・インターセプター・エラーマッピング                             | @core/base                                         |
| API SDK           | `@vh5/api`                                        | エンドポイント URL・リクエスト/レスポンス DTO                                         | @core/base（型のみ）                               |
| Core Base         | `@vh5/core-base`                                  | tree/date/dom ユーティリティ・キャッシュ・定数・`to()`                                | （なし——純粋関数）                                 |
| Composables       | `@vh5/composables`                                | フレームワーク非依存の Vue Composable                                                 | @core/base                                         |
| Stores            | `@vh5/stores`                                     | Pinia 初期化 + 永続化プラグイン                                                       | @core/base                                         |
| Locales           | `@vh5/locales`                                    | i18n 初期化・共有文字列                                                               | @core/base                                         |
| Styles            | `@vh5/styles`                                     | グローバル SCSS・デザイントークン・各ライブラリスタイルオーバーライド                 | （なし）                                           |

## 4. データフロー

### 4.1 読み取りフロー（商品詳細の例）

```
View（ProductDetail.vue）
  └─ useProductDetail(id)            ← composable（features/product）
       └─ ProductService.getDetail   ← サービス層：DTO → Product ドメインモデル
            └─ api.product.detail    ← エンドポイント定義
                 └─ request.get      ← HTTP 層（Auth・リトライ・エラー処理）
                      └─ fetch        ← ネットワーク
```

### 4.2 書き込みフロー（ログインの例）

```
LoginView
  └─ authStore.login(credentials)
       └─ AuthService.login(credentials)
            └─ api.auth.login(payload)
                 └─ request.post
       └─ 成功後：authStore.setSession(token, user)
       └─ router.replace(redirectTo)
```

## 5. ルーティング

- **静的ベースルート**は `@vh5/app-shell/router/base.ts` で一元定義。
- **各特性がルートモジュールを提供**し、`mergeRouteModules()` でマージ。
- **権限フィルタリング**は単一のグローバル `beforeEach` ガードで実行。

## 6. 状態管理

| ティア                 | 場所                         | 永続化      | 例                                   |
| ---------------------- | ---------------------------- | ----------- | ------------------------------------ |
| **サーバーキャッシュ** | Composable + `useAsyncState` | なし        | 商品リスト・商品詳細                 |
| **セッション状態**     | `useAuthStore`（特性）       | あり（AES） | Access Token・ユーザー情報・ロール   |
| **アプリ設定**         | `useAppStore`（app-shell）   | あり        | ロケール・テーマ・最後に訪問したタブ |

## 7. HTTP 層

`@vh5/request` は単一の `request` オブジェクトをエクスポートし、以下を内蔵しています：

- `authStore` から `Authorization: Bearer <token>` を注入
- `401` 時に単一リクエストで Token をリフレッシュ
- エラーの正規化：失敗のたびに `code`・`message`・`httpStatus`・`payload` を持つ `RequestError` をスロー
- `AbortController` によるリクエストキャンセル（Composable は `onScopeDispose` 時に自動キャンセル）

## 8. 国際化

- 共有文字列（`common.*`・`validation.*`・`error.*`）は `@vh5/locales` に格納。
- 特性固有の文字列は特性パッケージ内（`packages/features/product/locales/ja.json`）に配置し、bootstrap 時に `import.meta.glob` で自動マージ。
- 各 UI ライブラリの Locale はそれぞれのアダプターアプリがインストールします。特性パッケージはインストールしません。

## 9. エラー処理

- **HTTP エラー**は `@vh5/request` で正規化され `RequestError` として公開。
- **サービス層エラー**は回復可能なビジネス失敗（例：`InvalidCredentialsError`）をカプセル化。
- **View 層**は非スロー系フローに `to()` ユーティリティを使い、予期しないクラッシュにはグローバル `<ErrorBoundary>` を使用。
- **グローバル Toast アダプター**は各 UI ライブラリのアダプターアプリが提供し、`request` が特定ライブラリに依存せず `toast.error()` を呼び出せるようにします。

## 10. ビルドとツールチェーン

- **Turborepo** がアプリ横断の依存グラフで `build`・`dev`・`lint`・`typecheck` を調整。
- **`@vh5/vite-config`** が `defineConfig({ application: { uiLibrary } })` を提供。アダプターアプリのみがライブラリ名を宣言します。
- **`pnpm` catalog** がすべてのサードパーティ依存バージョンを一元管理。
- **`@vh5/tsconfig`** が `web-app.json`（アプリ）・`library.json`（パッケージ）・`node.json`（スクリプト/内部）を提供し、各パッケージが継承します。

## 11. 品質ゲート

- ESLint + OxLint + Stylelint + Prettier が `lefthook` pre-commit および CI の `turbo lint` で実行。
- `vitest` はテスト対象コードに隣接して配置；`@vh5/core-base` と `@vh5/services` は行カバレッジ ≥80% を目標。
- `circular-dependency-scanner` が CI で実行され、第 2 節のレイヤー規則を強制。

参照先：

- [ディレクトリ構成](./dir.md)
- [ルーティング](../essentials/route.md)
- [HTTP と API 層](../essentials/api.md)
- [状態管理](../essentials/state.md)
- [特性の追加](../essentials/contributing-features.md)
