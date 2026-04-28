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
    <header class="header">
      <img
        src="https://cdn.jsdelivr.net/gh/fonghehe/picture/vue-h5-template/logo.png"
        alt=""
      /><span>{{ t("app.title") }}</span>
    </header>
    <div class="intro-header">{{ t("app.desc") }}</div>

    <van-cell-group inset :title="t('app.techStack')" class="support-list">
      <van-cell v-for="item in techStack" :key="item" :title="item" icon="success" />
    </van-cell-group>
  </section>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 20px;
}

.header img {
  width: 45px;
  height: 45px;
}

.intro-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 12px;
}

.support-list {
  margin: 15px 8px 0;
}
</style>
