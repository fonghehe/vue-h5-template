<script setup lang="ts">
import { Snackbar } from '@varlet/ui';

import { t } from '@/locales';

import '@varlet/ui/es/snackbar/style/index.mjs';

function demo() {
  Snackbar.success(t('app.toastDemo'));
}

const switchValue = ref(false);
const inputValue = ref('');
const radioValue = ref('1');
const checkboxValue = ref(false);
const rate = ref(3);
const sliderValue = ref(40);
const counterValue = ref(1);
</script>

<template>
  <div class="p-3">
    <!-- Button -->
    <div class="font-600 mb-3">{{ t('demo.button') }}</div>
    <var-space wrap>
      <var-button type="primary" @click="demo">
        {{ t('app.buttonPrimary') }}
      </var-button>
      <var-button type="info">{{ t('app.buttonInfo') }}</var-button>
      <var-button type="success">{{ t('app.buttonSuccess') }}</var-button>
      <var-button type="danger">{{ t('app.buttonDanger') }}</var-button>
      <var-button type="warning">{{ t('app.buttonWarning') }}</var-button>
    </var-space>
    <var-space wrap class="mt-2">
      <var-button type="primary" outline>{{ t('demo.outline') }}</var-button>
      <var-button type="primary" round>{{ t('demo.round') }}</var-button>
      <var-button type="primary" size="small">{{ t('demo.small') }}</var-button>
      <var-button type="primary" size="mini">{{ t('demo.mini') }}</var-button>
      <var-button type="primary" loading>{{ t('mobile.loading') }}</var-button>
      <var-button type="primary" disabled>{{ t('demo.disabled') }}</var-button>
    </var-space>

    <!-- Cell -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.cell') }}</div>
    <var-cell :title="t('demo.title')" :description="t('demo.description')" />
    <var-cell :title="t('demo.arrow')" />
    <var-cell
      :title="t('demo.icon')"
      icon="information"
      :description="t('demo.description')"
    />

    <!-- Input -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.input') }}</div>
    <var-input v-model="inputValue" :placeholder="t('demo.placeholder')" />

    <!-- Switch -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.switch') }}</div>
    <var-switch v-model="switchValue" />

    <!-- Radio -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.radio') }}</div>
    <var-radio-group v-model="radioValue" direction="horizontal">
      <var-radio checked-value="1">{{ t('demo.option1') }}</var-radio>
      <var-radio checked-value="2">{{ t('demo.option2') }}</var-radio>
      <var-radio checked-value="3">{{ t('demo.option3') }}</var-radio>
    </var-radio-group>

    <!-- Checkbox -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.checkbox') }}</div>
    <var-checkbox v-model="checkboxValue">{{ t('demo.check') }}</var-checkbox>

    <!-- Rate -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.rate') }}</div>
    <var-rate v-model="rate" />

    <!-- Slider -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.slider') }}</div>
    <var-slider v-model="sliderValue" />

    <!-- Counter -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.counter') }}</div>
    <var-counter v-model="counterValue" />

    <!-- Chip -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.tag') }}</div>
    <var-space wrap>
      <var-chip type="primary">{{ t('app.buttonPrimary') }}</var-chip>
      <var-chip type="success">{{ t('app.buttonSuccess') }}</var-chip>
      <var-chip type="danger">{{ t('app.buttonDanger') }}</var-chip>
      <var-chip type="warning">{{ t('app.buttonWarning') }}</var-chip>
      <var-chip plain type="primary">{{ t('demo.plain') }}</var-chip>
      <var-chip round type="primary">{{ t('demo.round') }}</var-chip>
    </var-space>

    <!-- Badge -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.badge') }}</div>
    <var-space class="gap-5">
      <var-badge type="primary" :value="8">
        <var-icon name="information" :size="24" />
      </var-badge>
      <var-badge type="danger" :value="99">
        <var-icon name="star" :size="24" />
      </var-badge>
      <var-badge type="primary" dot>
        <var-icon name="heart" :size="24" />
      </var-badge>
    </var-space>

    <!-- Progress -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.progress') }}</div>
    <var-progress :value="68" />

    <!-- Divider -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.divider') }}</div>
    <var-divider>{{ t('demo.text') }}</var-divider>

    <!-- Skeleton -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.skeleton') }}</div>
    <var-skeleton :rows="3" :loading="true" />
  </div>
</template>
