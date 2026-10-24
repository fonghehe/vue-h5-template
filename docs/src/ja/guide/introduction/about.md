# 概要

pnpm + Turborepo で管理するモバイル Vue モノレポです。5 アプリは個別ビルドし、`packages/mobile-ui` で業務画面を共有、ネイティブナビとコンポーネント例は各 UI 実装を保ちます。本番ビルドはアプリごとに 1 つの UI フレームワークを使います。

英語既定の中日切替、テーマ付きヘッダー・AI ボタン、商品一覧/詳細・ローカルカート、Axios/OpenAPI、Vue Query のページ分割/更新/追加読み込み、停止可能な fetch/SSE チャットと安全な Markdown、SVG、モバイル API 例、任意の PWA と本番画像最適化を備えます。

| 技術 | 用途 |
| --- | --- |
| Vue 3 / Vue Router | UI と画面遷移 |
| TypeScript / Vite / UnoCSS | 型、ビルド、スタイル |
| Pinia / TanStack Vue Query | クライアントの状態とサーバーデータのキャッシュ |
| Axios / OpenAPI / Nitro | REST 通信、型、Mock API |
| Oxlint / ESLint / Stylelint / Oxfmt | Lint と整形 |
| Vitest / Playwright | ユニット、コンポーネント、ブラウザーテスト |

依存関係の範囲は `pnpm-workspace.yaml` の catalog で管理し、解決済みのバージョンは `pnpm-lock.yaml` に記録します。Node.js と pnpm の要件は[クイックスタート](./quick-start.md)を参照してください。

ルートは手書き、UnoCSS と scoped CSS は併用です。PWA とデバッグは任意です。SSR/SSG、本番アップロード、自動 token 更新、全アプリのロール認可は完成済み機能ではありません。[移行と計画](../v2/migration-v2.md)を参照してください。
