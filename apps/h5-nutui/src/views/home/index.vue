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
  <header class="flex-center gap-2 px-5 py-2.5 text-20px">
    <img
      class="w-45px h-45px"
      src="https://cdn.jsdelivr.net/gh/fonghehe/picture/vue-h5-template/logo.png"
      alt=""
    />
    <span>{{ t("app.title") }}</span>
  </header>
  <div class="flex-center mt-2.5 text-12px">{{ t("app.desc") }}</div>
  <nut-cell-group :title="t('app.techStack')" class="mx-2">
    <nut-cell v-for="item in techStack" :key="item" :title="item">
      <template #icon>
        <Check />
      </template>
    </nut-cell>
  </nut-cell-group>
</template>
