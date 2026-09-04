<script setup lang="ts">
import { computed, ref } from 'vue';

import { getErrorMessage, toggleProductFavorite } from '@vh5/api-client';
import { useI18n } from '@vh5/locales';

import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { useInfiniteProducts, useProductPage } from './queries';

import './surface.css';
const { t } = useI18n();
const page = ref(1);
const mode = ref<'infinite' | 'page'>('page');
const queryClient = useQueryClient();
const paged = useProductPage(page);
const infinite = useInfiniteProducts();
const items = computed(() =>
  mode.value === 'page'
    ? (paged.data.value?.items ?? [])
    : (infinite.data.value?.pages.flatMap((result) => result.items) ?? []),
);
const activeQuery = computed(() => (mode.value === 'page' ? paged : infinite));
// Favorite results are server state too; keep them in Query, not a Pinia mirror.
const favoriteVersion = ref(0);
const isFavorite = (id: number) => {
  void favoriteVersion.value;
  return queryClient.getQueryData<boolean>(['favorite', id]) ?? false;
};
const favorite = useMutation({
  mutationFn: (id: number) =>
    toggleProductFavorite({ productId: id, favorite: !isFavorite(id) }),
  onSuccess: async (result) => {
    queryClient.setQueryData(['favorite', result.productId], result.favorite);
    favoriteVersion.value++;
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});
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
    <p v-if="favorite.isError.value" role="alert">
      {{ getErrorMessage(favorite.error.value) }}
    </p>
    <div class="panel">
      <article v-for="item in items" :key="item.id" class="row-link">
        <span
          ><strong>{{ item.title }}</strong
          ><small>{{ item.shopName }} · ¥{{ item.price }}</small></span
        ><button
          class="favorite action secondary"
          :disabled="favorite.isPending.value"
          :aria-label="t('mobile.favorite')"
          :aria-pressed="isFavorite(item.id)"
          @click="favorite.mutate(item.id)"
        >
          {{ isFavorite(item.id) ? '♥' : '♡' }}
        </button>
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

.favorite {
  flex: 0 0 44px;
  width: 44px;
  padding: 0;
  font-size: 24px;
}
</style>
