<script setup lang="ts">
import { onScopeDispose, shallowRef } from 'vue';
import { useRouter } from 'vue-router';

import { useI18n } from '@vh5/locales';

const emit = defineEmits<{ failure: [] }>();
const router = useRouter();
const { t } = useI18n();
const reloadHref = shallowRef<string>();

// Router import failures happen outside Vue's rendering error boundary.
const removeErrorHandler = router.onError((_error, to) => {
  reloadHref.value = router.resolve(to.fullPath).href;
  emit('failure');
});
const removeAfterHook = router.afterEach((_to, _from, failure) => {
  if (!failure) reloadHref.value = undefined;
});
onScopeDispose(() => {
  removeErrorHandler();
  removeAfterHook();
});
</script>

<template>
  <aside v-if="reloadHref" class="route-load-error" role="alert">
    <p>{{ t('mobile.routeLoadFailed') }}</p>
    <!-- Reload the failed destination in a new document. -->
    <a :href="reloadHref">{{ t('mobile.reloadPage') }}</a>
  </aside>
</template>

<style scoped>
.route-load-error {
  position: fixed;
  top: calc(12px + env(safe-area-inset-top));
  right: 12px;
  left: 12px;
  z-index: 1000;
  max-width: 480px;
  padding: 16px;
  margin-inline: auto;
  color: var(--app-text);
  background: var(--app-surface-raised);
  border: 1px solid var(--app-border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
}

.route-load-error p {
  margin: 0 0 8px;
}

.route-load-error a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 12px;
  color: var(--app-primary-deep);
  border: 1px solid currentcolor;
  border-radius: 6px;
}

.route-load-error a:focus-visible {
  outline: 2px solid currentcolor;
  outline-offset: 2px;
}
</style>
