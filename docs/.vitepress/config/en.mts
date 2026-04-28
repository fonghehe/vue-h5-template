import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const en: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: "English",
  lang: "en-US",
  link: "/en/",
  themeConfig: {
    editLink: {
      pattern: "https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path",
      text: "Edit this page on GitHub",
    },
    nav: [
      { text: "Guide", link: "/en/guide/introduction/about" },
      { text: "Apps", link: "/en/apps/nutui" },
      { text: "Packages", link: "/en/packages/stores" },
    ],
    sidebar: {
      "/en/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "About", link: "/en/guide/introduction/about" },
            { text: "Why Vue H5 Template", link: "/en/guide/introduction/why" },
            { text: "Quick Start", link: "/en/guide/introduction/quick-start" },
          ],
        },
        {
          text: "Essentials",
          items: [
            { text: "Build & Deploy", link: "/en/guide/essentials/build" },
            { text: "Routing", link: "/en/guide/essentials/route" },
            { text: "Server Interaction", link: "/en/guide/essentials/server" },
            { text: "Internationalization", link: "/en/guide/essentials/locale" },
            { text: "Styles", link: "/en/guide/essentials/styles" },
            { text: "Create App", link: "/en/guide/essentials/create-app" },
          ],
        },
        {
          text: "Project",
          items: [
            { text: "Directory Structure", link: "/en/guide/project/dir" },
            { text: "Vite Config", link: "/en/guide/project/vite" },
            { text: "Code Standards", link: "/en/guide/project/standard" },
          ],
        },
        {
          text: "Other",
          items: [
            { text: "FAQ", link: "/en/guide/other/faq" },
            { text: "Project Update", link: "/en/guide/other/project-update" },
            { text: "Credits", link: "/en/guide/other/credits" },
          ],
        },
      ],
      "/en/apps/": [
        {
          text: "Apps",
          items: [
            { text: "NutUI", link: "/en/apps/nutui" },
            { text: "Vant", link: "/en/apps/vant" },
            { text: "Varlet", link: "/en/apps/varlet" },
            { text: "Mock Server", link: "/en/apps/backend-mock" },
          ],
        },
      ],
      "/en/packages/": [
        {
          text: "Shared Packages",
          items: [
            { text: "Stores", link: "/en/packages/stores" },
            { text: "Locales", link: "/en/packages/locales" },
            { text: "Utils", link: "/en/packages/utils" },
            { text: "Styles", link: "/en/packages/styles" },
            { text: "Vite Config", link: "/en/packages/vite-config" },
          ],
        },
      ],
    },
  },
};
