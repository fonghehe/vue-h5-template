import { createApp, watchEffect } from 'vue';

import { configureApiClient } from '@vh5/api-client';
import { i18n } from '@vh5/locales';
import { initStores } from '@vh5/stores';
import '@vh5/styles/global';
import '@vh5/styles/vant';

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { useTitle } from '@vueuse/core';

import App from './App.vue';
import { setupI18n, t } from './locales';
import router from './router';
import { useUserStore } from './stores/user';

import 'virtual:uno.css';

async function bootstrap(namespace: string) {
  const app = createApp(App);
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
      defaultOptions: {
        queries: { retry: 1, staleTime: 30_000 },
      },
    }),
  });
  app.use(router);
  app.mount('#app');

  // 动态标题
  watchEffect(() => {
    const routeTitle = router.currentRoute.value.meta?.title as
      | string
      | undefined;
    const pageTitle = routeTitle
      ? `${t(routeTitle)} - Vue H5 Template`
      : 'Vue H5 Template';
    useTitle(pageTitle);
  });
}

export { bootstrap };
