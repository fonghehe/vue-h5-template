import { createRouter, createWebHistory } from "vue-router";
import { startProgress, stopProgress } from "@vh5/utils";

import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/home/index.vue"),
          meta: { title: "首页" },
        },
        {
          path: "list",
          name: "list",
          component: () => import("@/views/list/index.vue"),
          meta: { title: "列表" },
        },
        {
          path: "details",
          name: "details",
          component: () => import("@/views/list/details/index.vue"),
          meta: { title: "详情" },
        },
        {
          path: "mine",
          name: "mine",
          component: () => import("@/views/mine/index.vue"),
          meta: { title: "我的" },
        },
        {
          path: "example",
          name: "example",
          component: () => import("@/views/example/index.vue"),
          meta: { title: "示例" },
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/login/index.vue"),
          meta: { title: "登录" },
        },
      ],
    },
  ],
});

router.beforeEach(() => {
  startProgress();
});

router.afterEach(() => {
  stopProgress();
});

export default router;
