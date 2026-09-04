<script setup lang="ts">
import { computed, ref } from 'vue';

import { useI18n } from '@vh5/locales';

import { useNetworkStatus, useVisualViewport } from '@vh5-core/composables';

import './surface.css';
const { t } = useI18n();
const { isOnline } = useNetworkStatus();
const { viewportHeight } = useVisualViewport();
const canShare = computed(() => typeof navigator.share === 'function');
const notice = ref('');
async function copy() {
  try {
    await navigator.clipboard.writeText('Vue H5 Template v2');
    notice.value = 'mobile.copied';
  } catch {
    notice.value = 'mobile.copyFailed';
  }
}
async function share() {
  try {
    await navigator.share({ title: document.title, url: location.href });
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'AbortError'))
      notice.value = 'mobile.failed';
  }
}
</script>
<template>
  <section class="product-page">
    <header>
      <span class="eyebrow">{{ t('mobile.mobile') }}</span>
      <h1>{{ t('mobile.mobileTitle') }}</h1>
      <p class="muted">{{ t('mobile.mobileDesc') }}</p>
    </header>
    <div class="panel">
      <div class="row-link">
        <span>{{ t('mobile.network') }}</span
        ><strong>{{ t(isOnline ? 'mobile.online' : 'mobile.offline') }}</strong>
      </div>
      <div class="row-link">
        <span>{{ t('mobile.viewport') }}</span
        ><strong>{{ Math.round(viewportHeight ?? 0) }}px</strong>
      </div>
      <div class="row-link">
        <span
          >{{ t('mobile.safeArea')
          }}<small>{{ t('mobile.safeAreaDesc') }}</small></span
        >
      </div>
    </div>
    <div class="panel actions">
      <button class="action" @click="copy">{{ t('mobile.clipboard') }}</button
      ><button class="action secondary" :disabled="!canShare" @click="share">
        {{ t('mobile.share') }}
      </button>
      <small v-if="!canShare" class="muted">
        {{ t('mobile.unsupported') }}
      </small>
    </div>
    <label class="panel keyboard-card"
      ><strong>{{ t('mobile.keyboard') }}</strong
      ><small class="muted">{{ t('mobile.keyboardHint') }}</small
      ><input type="text" :placeholder="t('mobile.keyboardPlaceholder')"
    /></label>
    <p v-if="notice" role="status">{{ t(notice) }}</p>
  </section>
</template>
<style scoped>
.keyboard-card {
  display: grid;
  gap: 12px;
}
</style>
