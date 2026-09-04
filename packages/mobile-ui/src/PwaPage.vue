<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue';

import { useI18n } from '@vh5/locales';

import { useNetworkStatus } from '@vh5-core/composables';

import './surface.css';
defineProps<{ enabled: boolean }>();
interface InstallEvent extends Event {
  prompt(): Promise<void>;
}
const prompt = shallowRef<InstallEvent>();
const { t } = useI18n();
const { isOnline } = useNetworkStatus();
function capture(event: Event) {
  event.preventDefault();
  prompt.value = event as InstallEvent;
}
async function install() {
  const event = prompt.value;
  prompt.value = undefined;
  try {
    await event?.prompt();
  } catch {
    /* A dismissed or unavailable prompt remains disabled. */
  }
}
onMounted(() => window.addEventListener('beforeinstallprompt', capture));
onBeforeUnmount(() =>
  window.removeEventListener('beforeinstallprompt', capture),
);
</script>
<template>
  <section class="product-page">
    <h1>{{ t('mobile.pwa') }}</h1>
    <p class="muted">{{ t('mobile.pwaDesc') }}</p>
    <div class="panel">
      <div class="row-link">
        <span>PWA</span
        ><strong>{{
          t(enabled ? 'mobile.enabled' : 'mobile.disabled')
        }}</strong>
      </div>
      <div class="row-link">
        <span>{{ t('mobile.network') }}</span
        ><strong>{{ t(isOnline ? 'mobile.online' : 'mobile.offline') }}</strong>
      </div>
    </div>
    <button class="action" :disabled="!prompt" @click="install">
      {{ t(prompt ? 'mobile.install' : 'mobile.installUnavailable') }}
    </button>
  </section>
</template>
