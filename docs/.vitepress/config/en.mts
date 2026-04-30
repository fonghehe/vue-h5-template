import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const en: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: "English",
  lang: "en-US",

  themeConfig: {
    editLink: {
      pattern: "https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path",
      text: "Edit this page on GitHub",
    },
    nav: [
      { text: "Guide", link: "/guide/introduction/about" },
      { text: "Apps", link: "/apps/nutui" },
      { text: "Packages", link: "/packages/stores" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "About", link: "/guide/introduction/about" },
            { text: "Why Vue H5 Template", link: "/guide/introduction/why" },
            { text: "Quick Start", link: "/guide/introduction/quick-start" },
          ],
        },
        {
          text: "Essentials",
          items: [
            { text: "Build & Deploy", link: "/guide/essentials/build" },
            { text: "Routing", link: "/guide/essentials/route" },
            { text: "Server Interaction", link: "/guide/essentials/server" },
            { text: "HTTP & API Layer", link: "/guide/essentials/api" },
            { text: "State Management", link: "/guide/essentials/state" },
            { text: "Internationalization", link: "/guide/essentials/locale" },
            { text: "Styles", link: "/guide/essentials/styles" },
            { text: "Create App", link: "/guide/essentials/create-app" },
            { text: "Adding a Feature", link: "/guide/essentials/contributing-features" },
          ],
        },
        {
          text: "Project",
          items: [
            { text: "System Architecture", link: "/guide/project/architecture" },
            { text: "Directory Structure", link: "/guide/project/dir" },
            { text: "Vite Config", link: "/guide/project/vite" },
            { text: "Code Standards", link: "/guide/project/standard" },
          ],
        },
        {
          text: "Other",
          items: [
            { text: "FAQ", link: "/guide/other/faq" },
            { text: "Project Update", link: "/guide/other/project-update" },
            { text: "Credits", link: "/guide/other/credits" },
          ],
        },
      ],
      "/apps/": [
        {
          text: "Apps",
          items: [
            { text: "NutUI", link: "/apps/nutui" },
            { text: "Vant", link: "/apps/vant" },
            { text: "Varlet", link: "/apps/varlet" },
            { text: "Mock Server", link: "/apps/backend-mock" },
          ],
        },
      ],
      "/packages/": [
        {
          text: "Shared Packages",
          items: [
            { text: "Stores", link: "/packages/stores" },
            { text: "Locales", link: "/packages/locales" },
            { text: "Utils", link: "/packages/utils" },
            { text: "Styles", link: "/packages/styles" },
            { text: "Vite Config", link: "/packages/vite-config" },
          ],
        },
      ],
    },
  },
};
