<script setup lang="ts">
import { ref } from 'vue';

import { loadLocaleMessages, useI18n } from '@vh5/locales';

const { locale, t } = useI18n();
const pending = ref(false);
const error = ref(false);
async function change(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  if (value !== 'en-US' && value !== 'zh-CN' && value !== 'ja-JP') return;
  pending.value = true;
  error.value = false;
  try {
    await loadLocaleMessages(value);
  } catch {
    error.value = true;
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <label class="language-select">
    <span>{{ t('app.language') }}</span>
    <select
      :value="locale"
      :disabled="pending"
      :aria-label="t('app.language')"
      @change="change"
    >
      <option value="en-US">English</option>
      <option value="zh-CN">简体中文</option>
      <option value="ja-JP">日本語</option>
    </select>
    <small v-if="error" role="alert">{{ t('mobile.failed') }}</small>
  </label>
</template>

<style scoped>
.language-select {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

select {
  max-width: 100%;
  min-height: 44px;
  padding: 0 12px;
  font: inherit;
  color: var(--app-text);
  background: var(--app-surface-raised);
  border: 1px solid var(--app-border);
  border-radius: 10px;
}

select:focus-visible {
  outline: 2px solid var(--app-primary);
  outline-offset: 2px;
}
</style>
