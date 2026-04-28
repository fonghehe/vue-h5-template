import { createApp, watchEffect } from "vue";

import { initStores } from "@vh5/stores";

import { useTitle } from "@vueuse/core";

import App from "./App.vue";
import { setupI18n } from "./locales";
import router from "./router";

import "@vh5/styles/global";

import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";

async function bootstrap(namespace: string) {
  const app = createApp(App);

  // 配置 i18n
  await setupI18n(app);

  // 配置 pinia store
  await initStores(app, { namespace });

  // 配置路由及路由守卫
  app.use(router);

  app.mount("#app");

  // 动态标题
  watchEffect(() => {
    const routeTitle = router.currentRoute.value.meta?.title as string | undefined;
    const pageTitle = routeTitle ? `${routeTitle} - Vue H5 Template` : "Vue H5 Template";
    useTitle(pageTitle);
  });
}

export { bootstrap };
