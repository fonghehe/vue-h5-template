import { createApp, watchEffect } from "vue";

import { initStores } from "@vh5/stores";
import { useTitle } from "@vueuse/core";

import App from "./App.vue";
import { setupI18n } from "./locales";
import router from "./router";

import "virtual:uno.css";
import "@vh5/styles/global";

async function bootstrap(namespace: string) {
  const app = createApp(App);
  await setupI18n(app);
  await initStores(app, { namespace });
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
