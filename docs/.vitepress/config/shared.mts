import type { DefaultTheme } from "vitepress";

export const shared = {
  title: "Vue H5 Template",
  description: "Vue 3 Mobile H5 Template Monorepo",
  base: "/vue-h5-template/",
  srcDir: "src",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  themeConfig: {
    logo: "/logo.svg",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/fonghehe/vue-h5-template",
      },
    ],
    search: {
      provider: "local" as const,
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
          ja: {
            translations: {
              button: {
                buttonText: "ドキュメント検索",
                buttonAriaLabel: "ドキュメント検索",
              },
              modal: {
                noResultsText: "結果が見つかりません",
                resetButtonTitle: "クエリをクリア",
                footer: {
                  selectText: "選択",
                  navigateText: "切替",
                  closeText: "閉じる",
                },
              },
            },
          },
        },
      },
    },
    editLink: {
      pattern: "https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present",
    },
  } satisfies DefaultTheme.Config,
};
