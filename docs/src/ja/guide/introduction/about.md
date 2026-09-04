# 概要

pnpm + Turborepo で管理するモバイル Vue モノレポです。3 アプリは個別ビルドし、`packages/mobile-ui` で業務画面を共有、ネイティブナビとコンポーネント例は各 UI 実装を保ちます。1 アプリに 3 フレームワークをまとめません。

英語既定の中日切替、テーマ付きヘッダー・AI ボタン、商品一覧/詳細・ローカルカート、Axios/OpenAPI、Vue Query のページ分割/更新/追加読み込み、停止可能な fetch/SSE チャットと安全な Markdown、SVG、モバイル API 例、任意の PWA と本番画像最適化を備えます。

| Package | Repository catalog |
| --- | --- |
| Vue / Vue Router | 3.5 / 5.2 |
| TypeScript / Vite | 6.0 / 8.1 (Rolldown) |
| Pinia / Vue Query | 4.0 / 5.x |
| Vue I18n / UnoCSS | 11.4 / 66.x |
| Vant / NutUI / Varlet | 4.10 / 4.3 / 3.19 |
| Vitest / Playwright | 4.1 / 1.62 |

表は catalog のバージョン系列で、上流の最新版を意味しません。解決済みの値は `pnpm-lock.yaml`、Node/pnpm 条件は[クイックスタート](./quick-start.md)で確認してください。

ルートは手書き、UnoCSS と scoped CSS は併用です。PWA とデバッグは任意です。SSR/SSG、本番アップロード、自動 token 更新、全アプリのロール認可は完成済み機能ではありません。[移行と計画](../v2/migration-v2.md)を参照してください。
