<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { getErrorMessage, getProductDetail } from '@vh5/api-client';
import { useI18n } from '@vh5/locales';

import { useQuery } from '@tanstack/vue-query';

import { useCartStore } from './cart';

import './surface.css';
const route = useRoute();
const { t, locale } = useI18n();
const id = computed(() => String(route.query.id ?? ''));
const product = useQuery({
  queryKey: ['products', 'detail', id, locale],
  queryFn: () => getProductDetail(id.value),
});
const cart = useCartStore();
const added = ref(false);
</script>
<template>
  <section class="product-page">
    <p v-if="product.isPending.value" role="status">
      {{ t('mobile.loading') }}
    </p>
    <div v-else-if="product.isError.value" role="alert">
      <p>{{ getErrorMessage(product.error.value) }}</p>
      <button class="action" @click="product.refetch()">
        {{ t('mobile.retry') }}
      </button>
    </div>
    <article v-else-if="product.data.value" class="panel">
      <img
        class="detail-image"
        :src="product.data.value.imgUrl"
        :alt="product.data.value.title"
      />
      <p class="eyebrow">{{ product.data.value.shopName }}</p>
      <h1>{{ product.data.value.title }}</h1>
      <p class="muted">
        {{ product.data.value.shopDesc }} · {{ product.data.value.delivery }}
      </p>
      <p v-if="product.data.value.description">
        {{ product.data.value.description }}
      </p>
      <h2>¥{{ product.data.value.price }}</h2>
      <div class="actions">
        <button
          class="action"
          @click="
            cart.add(product.data.value);
            added = true;
          "
        >
          {{ t('mobile.addCart') }}
        </button>
      </div>
      <p v-if="added" role="status">{{ t('mobile.added') }}</p>
    </article>
    <RouterLink class="action secondary" to="/list">
      {{ t('mobile.backProducts') }}
    </RouterLink>
  </section>
</template>
<style scoped>
.detail-image {
  display: block;
  width: 100%;
  max-height: 340px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
