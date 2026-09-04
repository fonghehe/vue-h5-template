<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { useI18n } from '@vh5/locales';

import './surface.css';
defineProps<{ framework: string }>();
const { t } = useI18n();
const examples = [
  { key: 'query', path: '/examples/query' },
  { key: 'request', path: '/examples/request' },
  { key: 'mobile', path: '/examples/mobile' },
  { key: 'icons', path: '/examples/svg-icons' },
  { key: 'pwa', path: '/examples/pwa' },
  { key: 'components', path: '/examples/components' },
];
</script>
<template>
  <section class="product-page">
    <header>
      <span class="eyebrow">{{ t('mobile.patterns') }}</span>
      <h1>{{ t('mobile.examplesTitle') }}</h1>
      <p class="muted">{{ t('mobile.examplesDesc') }}</p>
    </header>
    <div class="panel">
      <RouterLink
        v-for="item in examples"
        :key="item.path"
        :to="item.path"
        class="row-link"
      >
        <span
          ><strong
            >{{ item.key === 'components' ? `${framework} · ` : ''
            }}{{ t(`mobile.${item.key}`) }}</strong
          ><small>{{ t(`mobile.${item.key}Desc`) }}</small></span
        ><span aria-hidden="true">›</span>
      </RouterLink>
    </div>
    <slot></slot>
  </section>
</template>
