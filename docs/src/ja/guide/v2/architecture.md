# v2 アーキテクチャ

3つのアプリは `packages/mobile-ui` で同じタブと遅延読み込みビューを共有し、各 UI 固有のナビゲーションとコンポーネント例を維持します。本番ビルドは1つの UI ライブラリだけを含みます。

ルートは意図的に手書きです。現在の規模では Layout、遅延読み込み、title、KeepAlive、認証と権限を明示でき、未使用だったファイルルーティング生成より理解しやすいためです。
3つのアプリには、アプリケーションエラーバウンダリ、オフライン表示、Mobile Web API ページ、永続化可能なカートフローがあります。Network、Visual Viewport、Pull-to-refresh のライフサイクルは `@vh5-core/composables` に置きます。

## 現在の実装範囲

業務タブ・テーマ・HTTP 401 は共通です。`requiresAuth` 評価は Vant のみ、`authority` によるロール認可は未接続です。KeepAlive は条件付きで非キャッシュルートでは消えます。user/cart は本番も localStorage。自動 token 更新、サーバー同期カート、決済、アップロードは未実装です。[ルート](../essentials/route.md)、[状態](../essentials/state.md)、[配信](../essentials/build.md)を参照してください。
