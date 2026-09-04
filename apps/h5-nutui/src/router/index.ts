import { createRouter, createWebHistory } from 'vue-router';

import { startProgress, stopProgress } from '@vh5/utils';

import Layout from '@/layout/index.vue';
import { useUserStore } from '@/store/modules/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'home',
      children: [
        {
          path: 'examples/svg-icons',
          name: 'svg-icons-example',
          component: () => import('@/views/examples/svg-icons/index.vue'),
          meta: { title: 'mobile.icons' },
        },
        {
          path: 'examples/pwa',
          name: 'pwa-example',
          component: () => import('@/views/examples/pwa/index.vue'),
          meta: { title: 'mobile.pwa' },
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/cart/index.vue'),
          meta: { title: 'mobile.cart' },
        },
        {
          path: 'ai/chat',
          name: 'ai-chat',
          component: () => import('@/views/ai/chat/index.vue'),
          meta: { title: 'mobile.chat' },
        },
        {
          path: 'examples/query',
          name: 'query-example',
          component: () => import('@/views/examples/query/index.vue'),
          meta: { title: 'mobile.query' },
        },
        {
          path: 'examples/request',
          name: 'request-example',
          component: () => import('@/views/examples/request/index.vue'),
          meta: { title: 'mobile.request' },
        },
        {
          path: 'examples/mobile',
          name: 'mobile-example',
          component: () => import('@/views/examples/mobile/index.vue'),
          meta: { title: 'mobile.mobile' },
        },
        {
          path: 'examples/components',
          name: 'components-example',
          component: () => import('@/views/example/index.vue'),
          meta: { title: 'mobile.components' },
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: 'app.home' },
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('@/views/list/index.vue'),
          meta: { title: 'app.list' },
        },
        {
          path: 'details',
          name: 'details',
          component: () => import('@/views/list/details/index.vue'),
          meta: { title: 'app.details' },
        },
        {
          path: 'member',
          name: 'member',
          component: () => import('@/views/mine/index.vue'),
          meta: { title: 'app.mine' },
        },
        {
          path: 'examples',
          name: 'examples',
          component: () => import('@/views/examples/index.vue'),
          meta: { title: 'app.example' },
        },
        { path: 'mine', redirect: { name: 'member' } },
        { path: 'example', redirect: { name: 'examples' } },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login/index.vue'),
          meta: { guestOnly: true, title: 'app.login' },
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
  ],
});

router.beforeEach((to) => {
  startProgress();
  const userStore = useUserStore();
  if (to.meta.guestOnly && userStore.isLoggedIn) return { name: 'member' };
  return true;
});

router.afterEach(() => {
  stopProgress();
});

export default router;
