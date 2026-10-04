<script setup lang="ts">
import { onScopeDispose, ref } from 'vue';

import {
  fetchUserInfoApi,
  getErrorMessage,
  getProductList,
} from '@vh5/api-client';
import { useI18n } from '@vh5/locales';

import './surface.css';
const { t } = useI18n();
const loading = ref(false);
let controller: AbortController | undefined;
onScopeDispose(() => {
  controller?.abort();
  controller = undefined;
});
const result = ref<{
  count?: number;
  error?: string;
  name?: string;
  total?: number;
}>();
async function request(profile: boolean) {
  if (loading.value) return;
  const active = new AbortController();
  controller = active;
  loading.value = true;
  try {
    if (profile) {
      const user = await fetchUserInfoApi(active.signal);
      if (controller !== active) return;
      result.value = { name: user.realName };
    } else {
      const page = await getProductList(
        { page: 1, pageSize: 3 },
        active.signal,
      );
      if (controller !== active) return;
      result.value = { count: page.items.length, total: page.total };
    }
  } catch (error) {
    if (controller === active && !active.signal.aborted) {
      result.value = { error: getErrorMessage(error) };
    }
  } finally {
    if (controller === active) {
      controller = undefined;
      loading.value = false;
    }
  }
}
</script>
<template>
  <section class="product-page">
    <header class="panel">
      <span class="eyebrow">OPENAPI → TYPESCRIPT → AXIOS</span>
      <h1>{{ t('mobile.requestTitle') }}</h1>
      <p class="muted">{{ t('mobile.requestDesc') }}</p>
    </header>
    <div class="actions">
      <button class="action" :disabled="loading" @click="request(false)">
        {{ t('mobile.publicQuery') }}
      </button>

      <button
        class="action secondary"
        :disabled="loading"
        @click="request(true)"
      >
        {{ t('mobile.protectedRequest') }}
      </button>
    </div>
    <output class="panel result" aria-live="polite">{{
      loading
        ? t('mobile.loading')
        : !result
          ? t('mobile.noRequest')
          : (result.error ??
            (result.name
              ? t('mobile.signedIn', { name: result.name })
              : t('mobile.received', {
                  count: result.count ?? 0,
                  total: result.total ?? 0,
                })))
    }}</output>
  </section>
</template>
<style scoped>
.result {
  display: block;
  margin-top: 20px;
  overflow-wrap: anywhere;
}
</style>
