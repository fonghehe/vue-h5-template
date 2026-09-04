<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { useI18n } from '@vh5/locales';

import LanguageSelect from './LanguageSelect.vue';

import './surface.css';
defineProps<{ framework: string }>();
const { t } = useI18n();
const capabilities = [
  { key: 'chat', path: '/ai/chat', icon: '✦' },
  { key: 'query', path: '/examples/query', icon: '↻' },
  { key: 'patterns', path: '/examples', icon: '◇' },
];
</script>
<template>
  <section class="product-page home-page">
    <header class="hero">
      <span class="eyebrow">VUE H5 TEMPLATE · {{ framework }}</span>
      <h1>{{ t('app.title') }}</h1>
      <p>{{ t('app.desc') }}</p>
      <RouterLink class="action" to="/examples">
        {{ t('mobile.explore') }} →
      </RouterLink>
    </header>
    <div class="capabilities">
      <RouterLink
        v-for="item in capabilities"
        :key="item.key"
        :to="item.path"
        class="panel capability"
      >
        <span class="capability-icon" aria-hidden="true">{{ item.icon }}</span>
        <span
          ><strong>{{ t(`mobile.${item.key}`) }}</strong
          ><small>{{ t(`mobile.${item.key}Desc`) }}</small></span
        ><span aria-hidden="true">›</span>
      </RouterLink>
    </div>
    <section class="panel">
      <h2>{{ t('app.techStack') }}</h2>
      <div
        v-for="(item, index) in [
          'Vue 3.5 + TypeScript 6',
          'Vite 8 + Rolldown',
          'Pinia + Vue Query',
          'Vitest + Playwright',
        ]"
        :key="item"
        class="stack-row"
      >
        <span>{{ item }}</span
        ><small class="muted">{{ t(`mobile.stack${index}`) }}</small>
      </div>
    </section>
    <div class="panel"><LanguageSelect /></div>
  </section>
</template>
<style scoped>
.hero {
  padding: 28px 22px;
  margin-bottom: 20px;
  color: #fff;
  background:
    radial-gradient(circle at 95% 0, rgb(255 255 255 / 22%), transparent 44%),
    linear-gradient(135deg, var(--app-primary-deep), var(--app-primary));
  border-radius: 24px;
  box-shadow: 0 12px 28px rgb(var(--app-primary-rgb) / 20%);
}

.hero .eyebrow {
  color: #fff;
  opacity: 0.8;
}

.hero h1 {
  margin-top: 18px;
}

.hero p {
  max-width: 32em;
  opacity: 0.85;
}

.hero .action {
  margin-top: 8px;
  color: var(--app-primary-deep);
  background: #fff;
}

.capability {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.capability-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  font-size: 24px;
  color: var(--app-primary);
  background: var(--app-primary-soft);
  border-radius: 12px;
}

.capability small {
  display: block;
  margin-top: 6px;
  line-height: 1.5;
  color: var(--app-text-muted);
}

.stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 13px;
  border-top: 1px solid var(--app-border);
}
</style>
