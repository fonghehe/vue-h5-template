<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useI18n } from '@vh5/locales';

import { useCartStore } from './cart';
import CommerceDock from './CommerceDock.vue';
import SvgIcon from './SvgIcon.vue';

import './surface.css';
import './commerce.css';

type PaymentMethod = 'alipay' | 'card' | 'wechat';
interface DemoReceipt {
  amount: number;
  count: number;
  method: PaymentMethod;
}

const methods = [
  {
    id: 'wechat',
    icon: 'wallet',
    label: 'mobile.wechatPay',
    description: 'mobile.wechatPayDesc',
  },
  {
    id: 'alipay',
    icon: 'wallet',
    label: 'mobile.alipay',
    description: 'mobile.alipayDesc',
  },
  {
    id: 'card',
    icon: 'credit-card',
    label: 'mobile.bankCard',
    description: 'mobile.bankCardDesc',
  },
] satisfies {
  description: string;
  icon: string;
  id: PaymentMethod;
  label: string;
}[];
const cart = useCartStore();
const { t, locale } = useI18n();
const selectedMethod = ref<PaymentMethod>('wechat');
const receipt = ref<DemoReceipt>();
const selectedLines = computed(() =>
  cart.lines.filter((line) => line.selected),
);
const money = (cents: number) =>
  new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'CNY',
    currencyDisplay: 'narrowSymbol',
  }).format(cents / 100);
const methodLabel = computed(
  () => methods.find(({ id }) => id === receipt.value?.method)?.label ?? '',
);

function pay() {
  if (receipt.value || cart.selectedCount === 0) return;
  // UI-only demo: no order creation, SDK, payment request or stored card data.
  receipt.value = {
    amount: cart.selectedTotal,
    count: cart.selectedCount,
    method: selectedMethod.value,
  };
  cart.clear();
}
</script>

<template>
  <section
    class="product-page commerce-page payment-page"
    :class="{ 'with-commerce-dock': !receipt && cart.selectedCount > 0 }"
  >
    <div
      v-if="receipt"
      class="commerce-empty payment-success"
      role="status"
      aria-live="polite"
    >
      <div class="state-icon"><SvgIcon name="check" :size="40" /></div>
      <span class="eyebrow">{{ t('mobile.demoPayment') }}</span>
      <h1>{{ t('mobile.paymentSuccess') }}</h1>
      <p>{{ t('mobile.paymentSuccessDesc') }}</p>
      <dl class="receipt">
        <div>
          <dt>{{ t('mobile.total') }}</dt>
          <dd>{{ money(receipt.amount) }}</dd>
        </div>
        <div>
          <dt>{{ t('mobile.paymentMethod') }}</dt>
          <dd>{{ t(methodLabel) }}</dd>
        </div>
        <div>
          <dt>{{ t('mobile.orderItems') }}</dt>
          <dd>{{ t('mobile.itemCount', { count: receipt.count }) }}</dd>
        </div>
      </dl>
      <RouterLink class="commerce-cta" to="/list">
        {{ t('mobile.continueShopping')
        }}<SvgIcon name="arrow-right" :size="20" />
      </RouterLink>
      <RouterLink class="back-cart" to="/cart">
        {{ t('mobile.backCart') }}
      </RouterLink>
    </div>
    <div v-else-if="cart.selectedCount === 0" class="commerce-empty">
      <div class="state-icon"><SvgIcon name="shopping-bag" :size="38" /></div>
      <h1>{{ t('mobile.nothingToPay') }}</h1>
      <p>{{ t('mobile.selectBeforePay') }}</p>
      <RouterLink class="commerce-cta" to="/cart">
        {{ t('mobile.backCart') }}
      </RouterLink>
    </div>
    <template v-else>
      <header class="commerce-heading">
        <span class="eyebrow">{{ t('mobile.checkoutEyebrow') }}</span>
        <h1>{{ t('mobile.choosePayment') }}</h1>
        <p>{{ t('mobile.checkoutDemo') }}</p>
      </header>
      <div class="order-summary">
        <div class="order-heading">
          <span>{{ t('mobile.orderSummary') }}</span
          ><span class="demo-badge">{{ t('mobile.demoPayment') }}</span>
        </div>
        <strong class="order-amount">{{ money(cart.selectedTotal) }}</strong>
        <div class="order-preview">
          <div class="order-thumbnails">
            <img
              v-for="line in selectedLines.slice(0, 3)"
              :key="line.product.id"
              :src="line.product.imgUrl"
              alt=""
            />
          </div>
          <span>{{
            t('mobile.itemCount', { count: cart.selectedCount })
          }}</span>
        </div>
      </div>
      <fieldset class="payment-methods">
        <legend>{{ t('mobile.paymentMethod') }}</legend>
        <label
          v-for="method in methods"
          :key="method.id"
          class="payment-option"
          :class="{ selected: selectedMethod === method.id }"
        >
          <input
            v-model="selectedMethod"
            type="radio"
            name="payment-method"
            :value="method.id"
            :aria-label="t(method.label)"
          />
          <span class="method-icon"
            ><SvgIcon :name="method.icon" :size="24"
          /></span>
          <span class="method-copy"
            ><strong>{{ t(method.label) }}</strong
            ><small>{{ t(method.description) }}</small></span
          >
          <span class="method-check" aria-hidden="true"
            ><SvgIcon name="check" :size="14"
          /></span>
        </label>
      </fieldset>
      <p class="payment-note">
        <SvgIcon name="shield-check" :size="18" /><span>{{
          t('mobile.demoClearCart')
        }}</span>
      </p>
      <CommerceDock>
        <div class="dock-row">
          <span class="payment-due">{{ t('mobile.amountDue') }}</span>
          <div class="dock-total">
            <strong>{{ money(cart.selectedTotal) }}</strong>
          </div>
        </div>
        <button class="commerce-cta" @click="pay">
          {{ t('mobile.confirmPayment')
          }}<SvgIcon name="arrow-right" :size="20" />
        </button>
      </CommerceDock>
    </template>
  </section>
</template>

<style scoped>
.order-summary {
  padding: 20px;
  margin-bottom: 28px;
  background: var(--app-surface-raised);
  border: 1px solid var(--app-border);
  border-radius: 20px;
  box-shadow: var(--app-card-shadow);
}

.order-heading {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
}

.demo-badge {
  padding: 5px 8px;
  font-size: 10px;
  color: var(--app-primary-deep);
  background: var(--app-primary-soft);
  border-radius: 6px;
}

.order-amount {
  display: block;
  margin: 18px 0;
  font-size: 36px;
  font-weight: 750;
  font-variant-numeric: tabular-nums;
  letter-spacing: -1px;
}

.order-preview {
  display: flex;
  gap: 12px;
  align-items: center;
  padding-top: 16px;
  font-size: 12px;
  color: var(--app-text-muted);
  border-top: 1px solid var(--app-border);
}

.order-thumbnails {
  display: flex;
  gap: 6px;
}

.order-thumbnails img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 8px;
}

.payment-methods {
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

.payment-methods legend {
  padding: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
}

.payment-option {
  position: relative;
  display: flex;
  gap: 14px;
  align-items: center;
  min-height: 86px;
  padding: 16px;
  cursor: pointer;
  background: var(--app-surface-raised);
  border: 1.5px solid var(--app-border);
  border-radius: 18px;
}

.payment-option.selected {
  background: var(--app-primary-soft);
  border-color: var(--app-primary-deep);
}

.payment-option input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  opacity: 0;
}

.payment-option input:focus-visible ~ .method-check {
  outline: 2px solid var(--app-primary-deep);
  outline-offset: 3px;
}

.method-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 44px;
  height: 44px;
  color: var(--app-primary-deep);
  background: var(--app-surface);
  border-radius: 12px;
}

.method-copy {
  display: grid;
  flex: 1;
  gap: 5px;
  min-width: 0;
}

.method-copy strong {
  font-size: 14px;
  font-weight: 650;
}

.method-copy small {
  font-size: 12px;
  line-height: 1.5;
  color: var(--app-text-muted);
}

.method-check {
  display: grid;
  flex: none;
  place-items: center;
  width: 22px;
  height: 22px;
  color: transparent;
  border: 1.5px solid var(--app-border);
  border-radius: 50%;
}

.selected .method-check {
  color: #fff;
  background: var(--app-primary-deep);
  border-color: var(--app-primary-deep);
}

.payment-note {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-top: 20px;
  font-size: 12px;
  color: var(--app-text-muted);
}

.payment-note > .svg-icon {
  margin-top: 2px;
  color: var(--app-primary-deep);
}

.payment-due {
  font-size: 13px;
  color: var(--app-text-muted);
}

.payment-success {
  padding-top: 40px;
}

.receipt {
  display: grid;
  gap: 16px;
  width: 100%;
  padding: 20px;
  margin: 0 0 24px;
  text-align: left;
  background: var(--app-surface-raised);
  border: 1px solid var(--app-border);
  border-radius: 18px;
}

.receipt > div {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  font-size: 13px;
}

.receipt dt {
  color: var(--app-text-muted);
}

.receipt dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}

.back-cart {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 12px;
  font-size: 14px;
  color: var(--app-primary-deep);
}
</style>
