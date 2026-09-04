<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { getErrorMessage, getProductList } from '@vh5/api-client';
import { useI18n } from '@vh5/locales';

import { usePullToRefresh } from '@vh5-core/composables';

import { useQuery } from '@tanstack/vue-query';

import { useCartStore } from './cart';

import './surface.css';
const { t, locale } = useI18n();
const cart = useCartStore();
const products = useQuery({
  queryKey: ['products', 'catalog', locale],
  queryFn: () => getProductList(),
});
const items = computed(() => products.data.value?.items ?? []);
const notice = ref(false);
const { distance, onTouchEnd, onTouchMove, onTouchStart, ready, refreshing } =
  usePullToRefresh({
    onRefresh: async () => {
      await products.refetch();
    },
  });
</script>
<template>
  <section
    class="product-page catalog-page"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
  >
    <header class="catalog-header">
      <div>
        <span class="eyebrow">{{ t('mobile.collection') }}</span>
        <h1>{{ t('mobile.products') }}</h1>
      </div>
      <RouterLink class="cart-link" to="/cart">
        <span>{{ t('mobile.cart') }}</span
        ><strong>{{ t('mobile.itemCount', { count: cart.itemCount }) }}</strong>
      </RouterLink>
    </header>
    <p class="muted catalog-subtitle">{{ t('mobile.catalogDesc') }}</p>
    <div
      v-if="distance > 0 || refreshing"
      class="pull-indicator"
      :style="{ minHeight: `${distance}px` }"
      role="status"
    >
      {{
        t(
          refreshing
            ? 'mobile.refreshing'
            : ready
              ? 'mobile.release'
              : 'mobile.pull',
        )
      }}
    </div>
    <p v-if="products.isPending.value" role="status">
      {{ t('mobile.loading') }}
    </p>
    <div v-else-if="products.isError.value" class="panel" role="alert">
      <p>{{ getErrorMessage(products.error.value) }}</p>
      <button class="action" @click="products.refetch()">
        {{ t('mobile.retry') }}
      </button>
    </div>
    <p v-else-if="items.length === 0" class="panel">{{ t('mobile.empty') }}</p>
    <div class="catalog-grid">
      <article v-for="item in items" :key="item.id" class="product-card">
        <RouterLink
          class="product-image"
          :to="{ path: '/details', query: { id: item.id } }"
        >
          <img :src="item.imgUrl" :alt="item.title" loading="lazy" />
        </RouterLink>
        <div class="product-content">
          <span class="shop-label">{{ item.shopName }}</span>
          <RouterLink
            class="product-title"
            :to="{ path: '/details', query: { id: item.id } }"
          >
            {{ item.title }}
          </RouterLink>
          <p class="product-description">{{ item.shopDesc }}</p>
          <span class="delivery">{{ item.delivery }}</span>
          <div class="product-footer">
            <div class="price-group">
              <strong>¥{{ item.price }}</strong
              ><small>{{ t('mobile.memberPrice') }} ¥{{ item.vipPrice }}</small>
            </div>
            <button
              class="add-button"
              :aria-label="t('mobile.addCart')"
              @click="
                cart.add(item);
                notice = true;
              "
            >
              <span aria-hidden="true">＋</span>
            </button>
          </div>
        </div>
      </article>
    </div>
    <p v-if="notice" class="cart-notice" role="status">
      {{ t('mobile.added') }} ·
      {{ t('mobile.itemCount', { count: cart.itemCount }) }}
    </p>
  </section>
</template>
<style scoped>
.catalog-header {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.catalog-header h1 {
  margin-bottom: 0;
}

.catalog-subtitle {
  margin: 14px 0 22px;
  font-size: 14px;
}

.cart-link {
  display: grid;
  gap: 4px;
  min-height: 44px;
  font-size: 12px;
  color: var(--app-primary-deep);
  text-align: right;
  text-decoration: none;
}

.cart-link strong {
  font-size: 14px;
}

.catalog-grid {
  display: grid;
  gap: 16px;
}

.product-card {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  padding: 16px;
  background: var(--app-surface-raised);
  border: 1px solid var(--app-border);
  border-radius: 18px;
}

.product-image {
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--app-surface);
  border-radius: 12px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-content {
  min-width: 0;
}

.shop-label {
  display: block;
  margin-bottom: 6px;
  font-size: 11px;
  color: var(--app-primary-deep);
  overflow-wrap: anywhere;
}

.product-title {
  display: block;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.5;
  color: inherit;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.product-description {
  margin: 6px 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--app-text-muted);
  overflow-wrap: anywhere;
}

.delivery {
  display: block;
  font-size: 11px;
  color: var(--app-text-muted);
}

.product-footer {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.price-group {
  display: grid;
  gap: 4px;
  min-width: 0;
  overflow-wrap: anywhere;
}

.price-group strong {
  font-size: 20px;
  color: var(--app-primary-deep);
}

.price-group small {
  font-size: 10px;
  color: var(--app-text-muted);
}

.add-button {
  display: grid;
  flex: 0 0 44px;
  place-items: center;
  width: 44px;
  height: 44px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  background: var(--app-primary);
  border: 0;
  border-radius: 14px;
}

.pull-indicator {
  display: grid;
  place-items: center;
  font-size: 13px;
  color: var(--app-text-muted);
}

.cart-notice {
  font-size: 13px;
  color: var(--app-primary-deep);
}

@media (max-width: 359px) {
  .product-card {
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 12px;
    padding: 12px;
  }

  .product-page {
    padding-right: 12px;
    padding-left: 12px;
  }
}

@media (min-width: 640px) {
  .catalog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .product-card {
    grid-template-columns: 80px minmax(0, 1fr);
    gap: 12px;
  }
}
</style>
