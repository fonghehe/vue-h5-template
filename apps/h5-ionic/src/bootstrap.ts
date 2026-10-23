import { createApp } from 'vue';

import { configureApiClient } from '@vh5/api-client';
import { i18n, setupI18n, $t as t } from '@vh5/locales';
import { initStores } from '@vh5/stores';
import '@vh5/styles/global';

import { IonicVue } from '@ionic/vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { useTitle } from '@vueuse/core';

import App from './App.vue';
import router from './router';
import { useUserStore } from './stores/user';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import './theme.css';
import 'virtual:uno.css';

async function bootstrap(namespace: string) {
  const app = createApp(App).use(IonicVue);
  await setupI18n(app);
  await initStores(app, { namespace });
  const userStore = useUserStore();
  configureApiClient({
    baseURL: import.meta.env.VITE_GLOB_API_URL || '/api',
    getAccessToken: () => userStore.token,
    getLocale: () => i18n.global.locale.value,
    onUnauthorized: async () => {
      userStore.clearSession();
      const current = router.currentRoute.value;
      if (current.name !== 'login') {
        await router.replace({
          name: 'login',
          query: { redirect: current.fullPath },
        });
      }
    },
  });
  app.use(VueQueryPlugin, {
    queryClient: new QueryClient({
      defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
    }),
  });
  app.use(router);
  await router.isReady();
  app.mount('#app');

  // 动态标题
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Vue H5 Template';
  useTitle(() => {
    const routeTitle = router.currentRoute.value.meta.title;
    return typeof routeTitle === 'string'
      ? `${t(routeTitle)} - ${appTitle}`
      : appTitle;
  });
}

export { bootstrap };
