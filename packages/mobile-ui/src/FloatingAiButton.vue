<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { useI18n } from '@vh5/locales';

defineProps<{ withTabs: boolean }>();
const route = useRoute();
const { t } = useI18n();
const visible = computed(
  () => !['ai-chat', 'cart', 'details', 'login'].includes(String(route.name)),
);
</script>

<template>
  <RouterLink
    v-if="visible"
    class="ai-entry"
    :class="{ 'with-tabs': withTabs }"
    to="/ai/chat"
    :aria-label="t('mobile.openChat')"
    data-testid="ai-entry"
  >
    <span aria-hidden="true">✦</span><span>AI</span>
  </RouterLink>
</template>

<style scoped>
.ai-entry {
  position: absolute;
  right: max(16px, env(safe-area-inset-right));
  bottom: calc(18px + env(safe-area-inset-bottom));
  z-index: 19;
  display: inline-flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  min-height: 48px;
  padding: 0 12px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  background: var(--app-primary);
  border: 1px solid var(--app-primary-deep);
  border-radius: 18px;
  box-shadow: 0 6px 20px rgb(var(--app-primary-rgb) / 28%);
}

.with-tabs {
  bottom: calc(74px + env(safe-area-inset-bottom));
}

.ai-entry:focus-visible {
  outline: 3px solid var(--app-primary-deep);
  outline-offset: 3px;
}
</style>
