<script setup lang="ts">
import { computed, ref } from 'vue';

import { getErrorMessage } from '@vh5/api-client';
import { useI18n } from '@vh5/locales';

import FavoriteButton from './FavoriteButton.vue';
import { useInfiniteProducts, useProductPage } from './queries';

import './surface.css';
defineProps<{ session?: string }>();
const { t } = useI18n();
const page = ref(1);
const mode = ref<'infinite' | 'page'>('page');
const paged = useProductPage(page);
const infinite = useInfiniteProducts();
const items = computed(() =>
  mode.value === 'page'
    ? (paged.data.value?.items ?? [])
    : (infinite.data.value?.pages.flatMap((result) => result.items) ?? []),
);
const activeQuery = computed(() => (mode.value === 'page' ? paged : infinite));
</script>
<template>
  <section class="product-page">
    <header>
      <span class="eyebrow">TANSTACK QUERY</span>
      <h1>{{ t('mobile.queryTitle') }}</h1>
      <p class="muted">{{ t('mobile.queryDesc') }}</p>
    </header>
    <div class="actions modes">
      <button
        class="action"
        :class="{ secondary: mode !== 'page' }"
        :aria-pressed="mode === 'page'"
        @click="mode = 'page'"
      >
        {{ t('mobile.pagination') }}
      </button>

      <button
        class="action"
        :class="{ secondary: mode !== 'infinite' }"
        :aria-pressed="mode === 'infinite'"
        @click="mode = 'infinite'"
      >
        {{ t('mobile.infinite') }}
      </button>
    </div>
    <p v-if="activeQuery.isPending.value" role="status">
      {{ t('mobile.loading') }}
    </p>
    <div v-if="activeQuery.isError.value" class="panel" role="alert">
      <p>{{ getErrorMessage(activeQuery.error.value) }}</p>
      <button class="action" @click="activeQuery.refetch()">
        {{ t('mobile.retry') }}
      </button>
    </div>
    <div class="panel">
      <article v-for="item in items" :key="item.id" class="row-link">
        <span
          ><strong>{{ item.title }}</strong
          ><small>{{ item.shopName }} · ¥{{ item.price }}</small></span
        >
        <FavoriteButton :product-id="item.id" :session="session ?? ''" />
      </article>
    </div>
    <div v-if="mode === 'page'" class="actions">
      <button
        class="action secondary"
        :disabled="page === 1 || paged.isFetching.value"
        @click="page--"
      >
        {{ t('mobile.previous') }}
      </button>

      <span>{{ t('mobile.page', { page }) }}</span
      ><button
        class="action secondary"
        :disabled="!paged.data.value?.hasMore || paged.isFetching.value"
        @click="page++"
      >
        {{ t('mobile.next') }}
      </button>
    </div>
    <button
      v-else-if="infinite.hasNextPage.value"
      class="action"
      :disabled="infinite.isFetching.value"
      @click="infinite.fetchNextPage()"
    >
      {{ t(infinite.isFetching.value ? 'mobile.loading' : 'mobile.loadMore') }}
    </button>

    <p
      v-else-if="
        mode === 'infinite' &&
        !infinite.isPending.value &&
        !infinite.isError.value
      "
    >
      {{ t('mobile.loaded') }}
    </p>
  </section>
</template>
<style scoped>
.modes {
  margin: 20px 0;
}

.row-link {
  flex-wrap: wrap;
}
</style>
