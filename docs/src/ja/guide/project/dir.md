# プロジェクト構成

## ディレクトリ概要

```
vue-h5-template/
├── apps/                     # アプリケーション
│   ├── h5-nutui/             # NutUI H5
│   │   ├── src/
│   │   │   ├── bootstrap.ts  # アプリブートストラップ
│   │   │   ├── main.ts       # エントリファイル
│   │   │   ├── App.vue       # ルートコンポーネント
│   │   │   ├── router/       # ルート設定
│   │   │   ├── store/        # Pinia ユーザーストア
│   │   │   ├── layout/       # レイアウト（ナビバー + タブバー）
│   │   │   └── views/        # ページコンポーネント
│   │   ├── vite.config.mts   # Vite 設定
│   │   └── package.json
│   ├── h5-vant/              # Vant バージョン（同構成）
│   ├── h5-varlet/            # Varlet バージョン（同構成）
│   └── backend-mock/         # Nitro Mock バックエンド
│       ├── api/              # API ルート
│       ├── middleware/        # ミドルウェア（CORS）
│       ├── utils/            # ユーティリティ
│       └── routes/           # フォールバックルート
├── packages/                 # 共有パッケージ
│   ├── @core/                # コアパッケージ
│   ├── locales/              # i18n ロケールメッセージ
│   ├── stores/               # Pinia 状態管理
│   ├── styles/               # グローバルスタイル
│   └── utils/                # ユーティリティ関数
├── internal/                 # 内部設定
├── scripts/                  # スクリプト
└── docs/                     # VitePress ドキュメント
```

## H5 アプリのページ

各 H5 アプリには以下のページが含まれています：

| ルート         | ページ     | 説明                              |
| -------------- | ---------- | --------------------------------- |
| `/home`        | ホーム     | プロジェクト紹介と技術スタック    |
| `/list`        | リスト     | 商品リスト（Mock API から取得）   |
| `/details?id=` | 詳細       | 商品詳細（Mock API から取得）     |
| `/mine`        | マイページ | ユーザー情報、ログイン/ログアウト |
| `/example`     | サンプル   | UI コンポーネントサンプル         |
| `/login`       | ログイン   | フォームログイン（Mock API 連携） |

## 共有 Vite 設定

`internal/vite-config` は `defineConfig()` ファクトリ関数を提供します：

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: { uiLibrary: 'nut' },
  vite: {
    /* カスタム設定 */
  },
}));
```

対応 `uiLibrary`：`nut`、`vant`、`varlet`
