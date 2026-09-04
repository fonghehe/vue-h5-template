<script setup lang="ts">
import { Dongdong, Heart, Star } from '@nutui/icons-vue';
import { showToast } from '@nutui/nutui';

import { t } from '@/locales';

const showNutToast = () => {
  showToast.text(t('app.toastDemo'));
};

const switchValue = ref(false);
const inputValue = ref('');
const radioValue = ref('1');
const checkboxValue = ref(false);
const rate = ref(3);
const progress = ref(68);
const rangeValue = ref(40);
const stepperValue = ref(1);
</script>

<template>
  <div class="p-3">
    <!-- Button -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.button')
      }}</span>
      <div class="flex flex-wrap gap-2">
        <nut-button type="primary" @click="showNutToast">
          {{ t('app.buttonPrimary') }}
        </nut-button>
        <nut-button type="info">{{ t('app.buttonInfo') }}</nut-button>
        <nut-button type="default">{{ t('app.buttonDefault') }}</nut-button>
        <nut-button type="danger">{{ t('app.buttonDanger') }}</nut-button>
        <nut-button type="warning">{{ t('app.buttonWarning') }}</nut-button>
        <nut-button type="success">{{ t('app.buttonSuccess') }}</nut-button>
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <nut-button type="primary" plain>{{ t('demo.plain') }}</nut-button>
        <nut-button type="primary" round>{{ t('demo.round') }}</nut-button>
        <nut-button type="primary" size="small">
          {{ t('demo.small') }}
        </nut-button>
        <nut-button type="primary" size="mini">{{ t('demo.mini') }}</nut-button>
        <nut-button type="primary" loading>
          {{ t('mobile.loading') }}
        </nut-button>
        <nut-button type="primary" disabled>
          {{ t('demo.disabled') }}
        </nut-button>
      </div>
    </section>

    <!-- Cell -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.cell')
      }}</span>
      <nut-cell-group>
        <nut-cell :title="t('demo.title')" :desc="t('demo.description')" />
        <nut-cell :title="t('demo.arrow')" is-link />
        <nut-cell :title="t('demo.icon')" :desc="t('demo.description')">
          <template #icon><Dongdong /></template>
        </nut-cell>
      </nut-cell-group>
    </section>

    <!-- Form -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.input')
      }}</span>
      <nut-input v-model="inputValue" :placeholder="t('demo.placeholder')" />
    </section>

    <!-- Switch -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.switch')
      }}</span>
      <nut-switch v-model="switchValue" />
    </section>

    <!-- Radio -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.radio')
      }}</span>
      <nut-radio-group v-model="radioValue" direction="horizontal">
        <nut-radio label="1">{{ t('demo.option1') }}</nut-radio>
        <nut-radio label="2">{{ t('demo.option2') }}</nut-radio>
        <nut-radio label="3">{{ t('demo.option3') }}</nut-radio>
      </nut-radio-group>
    </section>

    <!-- Checkbox -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.checkbox')
      }}</span>
      <nut-checkbox v-model="checkboxValue" :label="t('demo.check')" />
    </section>

    <!-- Rate -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.rate')
      }}</span>
      <nut-rate v-model="rate" />
    </section>

    <!-- Progress -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.progress')
      }}</span>
      <nut-progress :percentage="progress" />
    </section>

    <!-- Range -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.slider')
      }}</span>
      <nut-range v-model="rangeValue" />
    </section>

    <!-- Stepper -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.stepper')
      }}</span>
      <nut-input-number v-model="stepperValue" />
    </section>

    <!-- Tag -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.tag')
      }}</span>
      <div class="flex flex-wrap gap-2">
        <nut-tag type="primary">{{ t('app.buttonPrimary') }}</nut-tag>
        <nut-tag type="success">{{ t('app.buttonSuccess') }}</nut-tag>
        <nut-tag type="danger">{{ t('app.buttonDanger') }}</nut-tag>
        <nut-tag type="warning">{{ t('app.buttonWarning') }}</nut-tag>
        <nut-tag plain>{{ t('demo.plain') }}</nut-tag>
        <nut-tag round type="primary">{{ t('demo.round') }}</nut-tag>
      </div>
    </section>

    <!-- Badge -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.badge')
      }}</span>
      <div class="flex gap-5">
        <nut-badge :value="8"><Dongdong width="24" height="24" /></nut-badge>
        <nut-badge :value="99"><Star width="24" height="24" /></nut-badge>
        <nut-badge dot><Heart width="24" height="24" /></nut-badge>
      </div>
    </section>

    <!-- Empty -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">{{
        t('demo.empty')
      }}</span>
      <nut-empty :description="t('mobile.empty')" />
    </section>
  </div>
</template>
