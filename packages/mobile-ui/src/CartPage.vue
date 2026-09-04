<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';

import { useI18n } from '@vh5/locales';

import { useCartStore } from './cart';
import CommerceDock from './CommerceDock.vue';
import SvgIcon from './SvgIcon.vue';

import './surface.css';
import './commerce.css';

const cart = useCartStore();
const router = useRouter();
const { t, locale } = useI18n();
const money = (cents: number) =>
  new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'CNY',
    currencyDisplay: 'narrowSymbol',
  }).format(cents / 100);

function checkout() {
  if (cart.selectedCount > 0) router.push('/payment');
}
</script>

<template>
  <section
    class="product-page commerce-page cart-page"
    :class="{ 'with-commerce-dock': cart.lines.length > 0 }"
  >
    <div v-if="cart.lines.length === 0" class="commerce-empty">
      <div class="state-icon"><SvgIcon name="shopping-bag" :size="38" /></div>
      <h1>{{ t('mobile.cartEmpty') }}</h1>
      <p>{{ t('mobile.cartEmptyDesc') }}</p>
      <RouterLink class="commerce-cta" to="/list">
        {{ t('mobile.browse') }}<SvgIcon name="arrow-right" :size="20" />
      </RouterLink>
    </div>
    <template v-else>
      <header class="commerce-heading">
        <span class="eyebrow">{{ t('mobile.cartEyebrow') }}</span>
        <h1>{{ t('mobile.cartTitle') }}</h1>
        <p>{{ t('mobile.cartReview', { count: cart.itemCount }) }}</p>
      </header>
      <div class="cart-items">
        <article
          v-for="line in cart.lines"
          :key="line.product.id"
          class="cart-line"
        >
          <div class="line-header">
            <span class="line-shop">{{ line.product.shopName }}</span>
            <button
              class="commerce-icon-button remove-button"
              :aria-label="t('mobile.removeItem', { name: line.product.title })"
              @click="cart.remove(line.product.id)"
            >
              <SvgIcon name="trash" :size="18" />
            </button>
          </div>
          <div class="line-main">
            <label class="selection-control">
              <input
                type="checkbox"
                :aria-label="t('mobile.select', { name: line.product.title })"
                :checked="line.selected"
                @change="cart.toggle(line.product.id)"
              />
              <span class="selection-mark" aria-hidden="true"
                ><SvgIcon name="check" :size="14"
              /></span>
            </label>
            <RouterLink
              class="line-image"
              :to="{ path: '/details', query: { id: line.product.id } }"
              :aria-label="line.product.title"
            >
              <img :src="line.product.imgUrl" alt="" loading="lazy" />
            </RouterLink>
            <div class="line-content">
              <RouterLink
                class="line-title"
                :to="{ path: '/details', query: { id: line.product.id } }"
              >
                {{ line.product.title }}
              </RouterLink>
              <span class="line-delivery">{{ line.product.delivery }}</span>
            </div>
          </div>
          <div class="line-footer">
            <strong class="line-price">¥{{ line.product.price }}</strong>
            <div class="quantity-stepper">
              <button
                :aria-label="t('mobile.decreaseQuantity')"
                :disabled="line.quantity <= 1"
                @click="cart.setQuantity(line.product.id, line.quantity - 1)"
              >
                <SvgIcon name="minus" :size="14" />
              </button>
              <input
                type="number"
                inputmode="numeric"
                :aria-label="t('mobile.quantity')"
                min="1"
                max="99"
                :value="line.quantity"
                @change="
                  cart.setQuantity(
                    line.product.id,
                    Number(($event.target as HTMLInputElement).value),
                  )
                "
              />
              <button
                :aria-label="t('mobile.increaseQuantity')"
                :disabled="line.quantity >= 99"
                @click="cart.setQuantity(line.product.id, line.quantity + 1)"
              >
                <SvgIcon name="plus" :size="14" />
              </button>
            </div>
          </div>
        </article>
      </div>
      <RouterLink class="continue-shopping" to="/list">
        {{ t('mobile.continueShopping')
        }}<SvgIcon name="arrow-right" :size="16" />
      </RouterLink>
      <p class="cart-demo-note">{{ t('mobile.checkoutDemo') }}</p>
      <CommerceDock class="cart-summary">
        <div class="dock-row">
          <label class="select-all">
            <span class="selection-control">
              <input
                type="checkbox"
                :checked="cart.allSelected"
                @change="cart.toggleAll()"
              />
              <span class="selection-mark" aria-hidden="true"
                ><SvgIcon name="check" :size="14"
              /></span>
            </span>
            {{ t('mobile.all') }}
          </label>
          <div class="dock-total">
            <span>{{ t('mobile.total') }}</span>
            <strong>{{ money(cart.selectedTotal) }}</strong>
          </div>
        </div>
        <button
          class="commerce-cta"
          :disabled="cart.selectedCount === 0"
          @click="checkout"
        >
          {{ t('mobile.checkout', { count: cart.selectedCount })
          }}<SvgIcon name="arrow-right" :size="20" />
        </button>
      </CommerceDock>
    </template>
  </section>
</template>

<style scoped>
.cart-items {
  display: grid;
  gap: 16px;
}

.cart-line {
  padding: 8px 16px 14px;
  background: var(--app-surface-raised);
  border: 1px solid var(--app-border);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgb(var(--app-primary-rgb) / 3%);
}

.line-header {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  margin-bottom: 8px;
}

.line-shop {
  font-size: 12px;
  font-weight: 600;
  color: var(--app-text-muted);
  overflow-wrap: anywhere;
}

.line-header .remove-button {
  margin-right: -8px;
}

.line-main {
  display: grid;
  grid-template-columns: 32px 72px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
}

.line-image {
  display: block;
  overflow: hidden;
  border-radius: 12px;
}

.line-image img {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.line-content {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.line-title {
  font-size: 14px;
  font-weight: 650;
  line-height: 1.55;
  color: var(--app-text);
  overflow-wrap: anywhere;
  text-decoration: none;
}

.line-delivery {
  font-size: 12px;
  line-height: 1.5;
  color: var(--app-text-muted);
}

.selection-control {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 44px;
  height: 44px;
  cursor: pointer;
}

.line-main > .selection-control {
  margin-left: -6px;
}

.selection-control input {
  position: absolute;
  inset: 0;
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  opacity: 0;
}

.selection-mark {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  color: transparent;
  background: var(--app-surface-raised);
  border: 1.5px solid var(--app-border);
  border-radius: 50%;
}

.selection-control input:checked + .selection-mark {
  color: #fff;
  background: var(--app-primary-deep);
  border-color: var(--app-primary-deep);
}

.selection-control input:focus-visible + .selection-mark {
  outline: 2px solid var(--app-primary-deep);
  outline-offset: 3px;
}

.line-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  margin-top: 16px;
  border-top: 1px solid var(--app-border);
}

.line-price {
  font-size: 20px;
  font-weight: 750;
  font-variant-numeric: tabular-nums;
  color: var(--app-primary-deep);
}

.quantity-stepper {
  display: inline-flex;
  align-items: center;
  padding: 2px;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 14px;
}

.quantity-stepper button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  color: var(--app-text);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 10px;
}

.quantity-stepper button:disabled {
  color: var(--app-text-muted);
  cursor: not-allowed;
  opacity: 0.4;
}

.quantity-stepper input {
  width: 36px;
  padding: 0;
  font-size: 14px;
  font-weight: 650;
  text-align: center;
  appearance: textfield;
  background: transparent;
  border: 0;
}

.quantity-stepper input::-webkit-inner-spin-button,
.quantity-stepper input::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
}

.select-all {
  display: flex;
  gap: 4px;
  align-items: center;
  min-height: 44px;
  margin-left: -10px;
  font-size: 14px;
  cursor: pointer;
}

.continue-shopping {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--app-primary-deep);
  text-decoration: none;
}

.cart-demo-note {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--app-text-muted);
  text-align: center;
}

@media (max-width: 359px) {
  .cart-line {
    padding-right: 12px;
    padding-left: 12px;
  }

  .line-main {
    grid-template-columns: 28px 56px minmax(0, 1fr);
    gap: 10px;
  }
}
</style>
