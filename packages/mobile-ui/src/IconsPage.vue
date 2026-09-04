<script setup lang="ts">
import { useI18n } from '@vh5/locales';

import SvgIcon, { iconNames } from './SvgIcon.vue';

import './surface.css';
const { t } = useI18n();
</script>
<template>
  <section class="product-page">
    <h1>{{ t('mobile.icons') }}</h1>
    <p class="muted">{{ t('mobile.iconsDesc') }}</p>
    <div class="icon-grid">
      <div v-for="name in iconNames" :key="name" class="panel icon-item">
        <SvgIcon :name="name" :title="name" :size="36" /><code>{{ name }}</code>
      </div>
    </div>
  </section>
</template>
<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.icon-item {
  display: grid;
  gap: 12px;
  justify-items: center;
  color: var(--app-primary);
}

.icon-item code {
  font-size: 11px;
}
</style>
