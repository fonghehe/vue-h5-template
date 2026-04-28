import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const ja: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: "日本語",
  lang: "ja",
  link: "/ja/",
  themeConfig: {
    outline: {
      label: "ページナビゲーション",
    },
    lastUpdated: {
      text: "最終更新",
    },
    editLink: {
      pattern: "https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path",
      text: "GitHub でこのページを編集",
    },
    docFooter: {
      prev: "前のページ",
      next: "次のページ",
    },
    nav: [
      { text: "ガイド", link: "/ja/guide/introduction/about" },
      { text: "アプリ", link: "/ja/apps/nutui" },
      { text: "パッケージ", link: "/ja/packages/stores" },
    ],
    sidebar: {
      "/ja/guide/": [
        {
          text: "はじめに",
          items: [
            { text: "紹介", link: "/ja/guide/introduction/about" },
            { text: "なぜ Vue H5 Template か", link: "/ja/guide/introduction/why" },
            { text: "クイックスタート", link: "/ja/guide/introduction/quick-start" },
          ],
        },
        {
          text: "基本",
          items: [
            { text: "ビルドとデプロイ", link: "/ja/guide/essentials/build" },
            { text: "ルーティング", link: "/ja/guide/essentials/route" },
            { text: "サーバー連携", link: "/ja/guide/essentials/server" },
            { text: "国際化", link: "/ja/guide/essentials/locale" },
            { text: "スタイル", link: "/ja/guide/essentials/styles" },
            { text: "アプリ作成", link: "/ja/guide/essentials/create-app" },
          ],
        },
        {
          text: "プロジェクト",
          items: [
            { text: "ディレクトリ構成", link: "/ja/guide/project/dir" },
            { text: "Vite 設定", link: "/ja/guide/project/vite" },
            { text: "コード規約", link: "/ja/guide/project/standard" },
          ],
        },
        {
          text: "その他",
          items: [
            { text: "よくある質問", link: "/ja/guide/other/faq" },
            { text: "プロジェクト更新", link: "/ja/guide/other/project-update" },
            { text: "謝辞", link: "/ja/guide/other/credits" },
          ],
        },
      ],
      "/ja/apps/": [
        {
          text: "アプリ",
          items: [
            { text: "NutUI", link: "/ja/apps/nutui" },
            { text: "Vant", link: "/ja/apps/vant" },
            { text: "Varlet", link: "/ja/apps/varlet" },
            { text: "Mock サーバー", link: "/ja/apps/backend-mock" },
          ],
        },
      ],
      "/ja/packages/": [
        {
          text: "共有パッケージ",
          items: [
            { text: "Stores", link: "/ja/packages/stores" },
            { text: "Locales", link: "/ja/packages/locales" },
            { text: "Utils", link: "/ja/packages/utils" },
            { text: "Styles", link: "/ja/packages/styles" },
            { text: "Vite Config", link: "/ja/packages/vite-config" },
          ],
        },
      ],
    },
  },
};
