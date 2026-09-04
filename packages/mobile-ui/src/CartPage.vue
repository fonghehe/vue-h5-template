<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useI18n } from '@vh5/locales';

import { useCartStore } from './cart';

import './surface.css';
const cart = useCartStore();
const { t, locale } = useI18n();
const notice = ref(false);
const money = (cents: number) =>
  new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'CNY',
  }).format(cents / 100);
</script>
<template>
  <section class="product-page cart-page">
    <div v-if="cart.lines.length === 0" class="panel">
      <h1>{{ t('mobile.cartEmpty') }}</h1>
      <RouterLink class="action" to="/list">
        {{ t('mobile.browse') }}
      </RouterLink>
    </div>
    <template v-else>
      <article
        v-for="line in cart.lines"
        :key="line.product.id"
        class="cart-line panel"
      >
        <input
          type="checkbox"
          :aria-label="t('mobile.select', { name: line.product.title })"
          :checked="line.selected"
          @change="cart.toggle(line.product.id)"
        />
        <img :src="line.product.imgUrl" alt="" />
        <div class="line-content">
          <strong>{{ line.product.title }}</strong
          ><span>¥{{ line.product.price }}</span>
          <div class="actions">
            <input
              type="number"
              :aria-label="t('mobile.quantity')"
              min="1"
              max="99"
              :value="line.quantity"
              @change="
                cart.setQuantity(
                  line.product.id,
                  Number(($event.target as HTMLInputElement).value) || 1,
                )
              "
            /><button
              class="action secondary"
              @click="cart.remove(line.product.id)"
            >
              {{ t('mobile.remove') }}
            </button>
          </div>
        </div>
      </article>
      <p v-if="notice" role="status">{{ t('mobile.checkoutDemo') }}</p>
      <footer class="cart-summary">
        <label
          ><input
            type="checkbox"
            :checked="cart.allSelected"
            @change="cart.toggleAll()"
          />{{ t('mobile.all') }}</label
        >
        <div>
          {{ t('mobile.total') }}
          <strong>{{ money(cart.selectedTotal) }}</strong>
        </div>
        <button
          class="action"
          :disabled="cart.selectedCount === 0"
          @click="notice = true"
        >
          {{ t('mobile.checkout', { count: cart.selectedCount }) }}
        </button>
      </footer>
    </template>
  </section>
</template>
<style scoped>
.cart-page {
  padding-bottom: calc(164px + env(safe-area-inset-bottom));
}

.cart-line {
  display: grid;
  grid-template-columns: 24px 64px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 14px;
}

.cart-line img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
}

.line-content {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.line-content > strong {
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.line-content > span {
  font-weight: 700;
  color: var(--app-primary-deep);
}

.line-content input {
  width: 64px;
}

.cart-summary {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: var(--app-surface-raised);
  border-top: 1px solid var(--app-border);
}

.cart-summary label {
  display: flex;
  gap: 6px;
  align-items: center;
}

.cart-summary strong {
  color: var(--app-primary-deep);
}

input[type='checkbox'] {
  accent-color: var(--app-primary);
}

@media (max-width: 390px) {
  .cart-summary > button {
    width: 100%;
  }

  .cart-line {
    grid-template-columns: 20px 48px minmax(0, 1fr);
    gap: 8px;
  }

  .cart-line img {
    width: 48px;
    height: 48px;
  }
}
</style>
