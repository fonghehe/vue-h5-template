<script setup lang="ts">
import { t } from "@/locales";
import { Check } from "@nutui/icons-vue";

const techStack = [
  "Vue 3.5",
  "Vite 7",
  "Vue Router 4",
  "Pinia 3",
  "NutUI 4",
  "TypeScript 5",
  "@vueuse/core",
  "i18n (zh / en / ja)",
  "Turborepo Monorepo",
];
</script>

<template>
  <header class="header">
    <img
      src="https://cdn.jsdelivr.net/gh/fonghehe/picture/vue-h5-template/logo.png"
      alt=""
    /><span>{{ t("app.title") }}</span>
  </header>
  <div class="intro-header">{{ t("app.desc") }}</div>
  <nut-cell-group :title="t('app.techStack')" class="supportList">
    <nut-cell v-for="item in techStack" :key="item" :title="item">
      <template #icon>
        <Check />
      </template>
    </nut-cell>
  </nut-cell-group>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 20px;

  img {
    width: 45px;
    height: 45px;
  }
}

.intro-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 12px;
}

.supportList {
  margin: 0 8px;

  .nut-cell-group__title {
    margin-top: 15px;
  }
}
</style>
