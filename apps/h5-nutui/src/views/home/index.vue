<script setup lang="ts">
import { Check } from '@nutui/icons-vue';

import { t } from '@/locales';

const techStack = [
  'Vue 3.5',
  'Vite 7',
  'Vue Router 4',
  'Pinia 3',
  'NutUI 4',
  'TypeScript 5',
  '@vueuse/core',
  'i18n (zh / en / ja)',
  'Turborepo Monorepo',
];
</script>

<template>
  <header class="flex items-center justify-center gap-10px pt-10px text-20px">
    <img
      class="w-45px h-45px"
      src="https://cdn.jsdelivr.net/gh/fonghehe/picture/vue-h5-template/logo.png"
      alt=""
    />
    <span>{{ t('app.title') }}</span>
  </header>
  <div class="flex items-center justify-center mt-10px text-12px">
    {{ t('app.desc') }}
  </div>
  <nut-cell-group :title="t('app.techStack')" class="cell">
    <nut-cell v-for="item in techStack" :key="item" :title="item">
      <template #icon>
        <Check />
      </template>
    </nut-cell>
  </nut-cell-group>
</template>

<style lang="scss" scoped>
.cell {
  :deep(.nut-cell-group__title) {
    margin-top: 10px;
  }

  :deep(.nut-cell-group__wrap) {
    box-shadow: none;
  }
}
</style>
