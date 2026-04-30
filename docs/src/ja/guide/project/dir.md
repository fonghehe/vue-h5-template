# プロジェクト構成

詳しくは [システムアーキテクチャ](./architecture.md) をご覧ください。

## 1. トップレベル概要

```
vue-h5-template/
├── apps/                # ランタイムアプリ（UI アダプター + Mock バックエンド）
├── packages/            # 再利用可能なライブラリ（レイヤー別）
├── internal/            # ビルドツール（設定・Lint・TS・Vite）
├── scripts/             # CLI ツール
└── docs/                # VitePress ドキュメント
```

## 2. `apps/` — UI アダプター層

```
apps/
├── h5-nutui/            # NutUI アダプター        （ポート 5777）
├── h5-vant/             # Vant アダプター         （ポート 5778）
├── h5-varlet/           # Varlet アダプター       （ポート 5779）
└── backend-mock/        # Nitro Mock サーバー     （ポート 5320）
```

アダプターアプリは View・Store・API 呼び出し・ルートを**含みません**。これらは特性パッケージとシェルに置かれます。

## 3. `packages/` — レイヤード・ライブラリ

```
packages/
├── @core/
│   ├── base/            # @vh5/core-base    — 純粋なユーティリティ
│   └── composables/     # @vh5/composables  — Vue Composable
├── api/                 # @vh5/api          — エンドポイント宣言 + DTO
├── request/             # @vh5/request      — 型付き fetch クライアント + インターセプター
├── services/            # @vh5/services     — ドメインモデル & ビジネスルール
├── stores/              # @vh5/stores       — Pinia 初期化 + 永続化
├── locales/             # @vh5/locales      — i18n 初期化 + 共有文字列
├── styles/              # @vh5/styles       — グローバル CSS & デザイントークン
├── utils/               # @vh5/utils        — ルートヘルパー
├── app-shell/           # @vh5/app-shell    — ブートストラップ・レイアウト・ルーター・ガード
└── features/
    ├── auth/            # @vh5/feature-auth
    ├── user/            # @vh5/feature-user
    ├── product/         # @vh5/feature-product
    └── home/            # @vh5/feature-home
```

## 4. クイックリファレンス

| 追加したいもの            | 置く場所                                                        |
| ------------------------- | --------------------------------------------------------------- |
| 新しいページ              | `packages/features/<feature>/src/views/`                        |
| 新しい API エンドポイント | `packages/api/src/<domain>.ts` + `services/<domain>.service.ts` |
| 新しい Pinia Store        | `packages/features/<feature>/src/store.ts`                      |
| 新しい共有 Composable     | `packages/@core/composables/src/`                               |
| 新しいロケール文字列      | `packages/features/<feature>/src/locales/<lang>.json`           |
| 新しいグローバルスタイル  | `packages/styles/src/global/`                                   |
