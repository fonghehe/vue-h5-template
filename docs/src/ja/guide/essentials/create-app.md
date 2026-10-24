# アプリ作成

UI フレームワークとアプリ名を選びます。たとえば `h5-my-app` を入力すると、`apps/h5-my-app` に `@vh5/h5-my-app` パッケージが作成されます。

```bash
pnpm create-app
```

## テンプレートの選択

CLI は共有の業務ページ、Mock、連携サービスモードを含む参照アプリをコピーします。生成されるモード設定にアプリ名と専用のストレージ名前空間を定義します。

| UI フレームワーク | 開発用ポート |
| --- | --- |
| NutUI | 5780 |
| Vant | 5781 |
| Varlet | 5782 |
| TDesign Mobile Vue | 5785 |
| Ionic Vue | 5786 |

## インストールと検証

ワークスペースのルートで依存関係をインストールし、生成したアプリの型を確認してから開発サーバーを起動します。

```bash
pnpm install
pnpm -F @vh5/h5-my-app type-check
pnpm -F @vh5/h5-my-app dev
```

`pnpm run build --filter=@vh5/h5-my-app` でビルドできます。どのアプリでも連携サービスの起動後に `pnpm -F @vh5/h5-my-app dev:services` も使えます。ルートの短縮スクリプトは必要に応じて追加してください。 [バックエンドモード](./server.md)
