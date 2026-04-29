<script setup lang="ts">
import { t } from "@/locales";

const techStack = [
  "Vue 3.5",
  "Vite 7",
  "Vue Router 4",
  "Pinia 3",
  "Vant 4",
  "TypeScript 5",
  "@vueuse/core",
  "i18n (zh / en / ja)",
  "Turborepo Monorepo",
];
</script>

<template>
  <section>
    <header class="flex items-center justify-center px-5 py-2.5 text-20px">
      <img
        class="w-45px h-45px"
        src="https://cdn.jsdelivr.net/gh/fonghehe/picture/vue-h5-template/logo.png"
        alt=""
      /><span>{{ t("app.title") }}</span>
    </header>
    <div class="flex items-center justify-center mt-2.5 text-12px">{{ t("app.desc") }}</div>

    <van-cell-group inset :title="t('app.techStack')" class="mt-15px mx-2">
      <van-cell v-for="item in techStack" :key="item" :title="item" icon="success" />
    </van-cell-group>
  </section>
</template>
