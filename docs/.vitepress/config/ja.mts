import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const ja: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: '日本語',
  lang: 'ja',
  link: '/ja/',
  themeConfig: {
    outline: {
      label: 'ページナビゲーション',
    },
    lastUpdated: {
      text: '最終更新',
    },
    editLink: {
      pattern:
        'https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path',
      text: 'GitHub でこのページを編集',
    },
    docFooter: {
      prev: '前のページ',
      next: '次のページ',
    },
    nav: [
      { text: 'ガイド', link: '/ja/guide/introduction/about' },
      { text: 'アプリ', link: '/ja/apps/nutui' },
      { text: 'パッケージ', link: '/ja/packages/stores' },
    ],
    sidebar: {
      '/ja/guide/': [
        {
          text: 'はじめに',
          items: [
            { text: '紹介', link: '/ja/guide/introduction/about' },
            {
              text: 'なぜ Vue H5 Template か',
              link: '/ja/guide/introduction/why',
            },
            {
              text: 'クイックスタート',
              link: '/ja/guide/introduction/quick-start',
            },
          ],
        },
        {
          text: '基本',
          items: [
            { text: 'ビルドとデプロイ', link: '/ja/guide/essentials/build' },
            { text: 'ルーティング', link: '/ja/guide/essentials/route' },
            { text: 'サーバー連携', link: '/ja/guide/essentials/server' },
            { text: 'HTTP と API 層', link: '/ja/guide/essentials/api' },
            { text: '状態管理', link: '/ja/guide/essentials/state' },
            { text: '国際化', link: '/ja/guide/essentials/locale' },
            { text: 'スタイル', link: '/ja/guide/essentials/styles' },
            { text: 'アプリ作成', link: '/ja/guide/essentials/create-app' },
            {
              text: '特性の追加',
              link: '/ja/guide/essentials/contributing-features',
            },
          ],
        },
        {
          text: 'v2 アーキテクチャ',
          items: [
            { text: 'アーキテクチャ', link: '/ja/guide/v2/architecture' },
            { text: 'リクエスト', link: '/ja/guide/v2/request' },
            { text: '状態管理', link: '/ja/guide/v2/state-management' },
            { text: 'AI Chat', link: '/ja/guide/v2/ai-chat' },
            { text: 'UI 戦略', link: '/ja/guide/v2/ui-framework' },
            { text: 'テスト', link: '/ja/guide/v2/testing' },
            { text: 'デプロイ', link: '/ja/guide/v2/deployment' },
            { text: '移行', link: '/ja/guide/v2/migration-v2' },
          ],
        },
        {
          text: 'プロジェクト',
          items: [
            {
              text: 'システムアーキテクチャ',
              link: '/ja/guide/project/architecture',
            },
            { text: 'ディレクトリ構成', link: '/ja/guide/project/dir' },
            { text: 'Vite 設定', link: '/ja/guide/project/vite' },
            { text: 'コード規約', link: '/ja/guide/project/standard' },
            { text: 'CLI（vsh）', link: '/ja/guide/project/cli' },
            {
              text: '翻訳と多言語ドキュメント',
              link: '/ja/guide/project/translating',
            },
          ],
        },
        {
          text: 'その他',
          items: [
            { text: 'よくある質問', link: '/ja/guide/other/faq' },
            {
              text: 'プロジェクト更新',
              link: '/ja/guide/other/project-update',
            },
            { text: '謝辞', link: '/ja/guide/other/credits' },
          ],
        },
      ],
      '/ja/apps/': [
        {
          text: 'アプリ',
          items: [
            { text: 'NutUI', link: '/ja/apps/nutui' },
            { text: 'Vant', link: '/ja/apps/vant' },
            { text: 'Varlet', link: '/ja/apps/varlet' },
            { text: 'Mock サーバー', link: '/ja/apps/backend-mock' },
          ],
        },
      ],
      '/ja/packages/': [
        {
          text: '共有パッケージ',
          items: [
            { text: 'Mobile UI', link: '/ja/packages/mobile-ui' },
            { text: 'API Client', link: '/ja/packages/api-client' },
            { text: 'AI Chat', link: '/ja/packages/ai-chat' },
            { text: 'Stores', link: '/ja/packages/stores' },
            { text: 'Locales', link: '/ja/packages/locales' },
            { text: 'Utils', link: '/ja/packages/utils' },
            { text: 'Styles', link: '/ja/packages/styles' },
            { text: 'Vite Config', link: '/ja/packages/vite-config' },
            { text: 'Core (@vh5-core)', link: '/ja/packages/core' },
          ],
        },
      ],
    },
  },
};
