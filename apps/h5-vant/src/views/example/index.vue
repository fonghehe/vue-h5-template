<script setup lang="ts">
import { showToast } from 'vant';

import { t } from '@/locales';

function demo() {
  showToast(t('app.toastDemo'));
}

const switchValue = ref(false);
const inputValue = ref('');
const radioValue = ref('1');
const checkboxValue = ref(false);
const rate = ref(3);
const sliderValue = ref(40);
const stepperValue = ref(1);
</script>

<template>
  <div class="p-3">
    <!-- Button -->
    <div class="font-600 mb-3">{{ t('demo.button') }}</div>
    <van-space direction="vertical" fill>
      <van-space wrap>
        <van-button type="primary" @click="demo">
          {{ t('app.buttonPrimary') }}
        </van-button>
        <van-button type="success">{{ t('app.buttonSuccess') }}</van-button>
        <van-button type="default">{{ t('app.buttonDefault') }}</van-button>
        <van-button type="danger">{{ t('app.buttonDanger') }}</van-button>
        <van-button type="warning">{{ t('app.buttonWarning') }}</van-button>
      </van-space>
      <van-space wrap>
        <van-button type="primary" plain>{{ t('demo.plain') }}</van-button>
        <van-button type="primary" round>{{ t('demo.round') }}</van-button>
        <van-button type="primary" size="small">
          {{ t('demo.small') }}
        </van-button>
        <van-button type="primary" size="mini">{{ t('demo.mini') }}</van-button>
        <van-button
          type="primary"
          loading
          :loading-text="t('mobile.loading')"
        />
        <van-button type="primary" disabled>
          {{ t('demo.disabled') }}
        </van-button>
      </van-space>
    </van-space>

    <!-- Cell -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.cell') }}</div>
    <van-cell-group inset>
      <van-cell :title="t('demo.title')" :value="t('demo.content')" />
      <van-cell :title="t('demo.arrow')" is-link />
      <van-cell
        :title="t('demo.icon')"
        icon="location-o"
        :value="t('demo.description')"
      />
    </van-cell-group>

    <!-- Field -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.input') }}</div>
    <van-cell-group inset>
      <van-field
        v-model="inputValue"
        :label="t('demo.text')"
        :placeholder="t('demo.placeholder')"
      />
    </van-cell-group>

    <!-- Switch -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.switch') }}</div>
    <van-switch v-model="switchValue" />

    <!-- Radio -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.radio') }}</div>
    <van-radio-group v-model="radioValue" direction="horizontal">
      <van-radio name="1">{{ t('demo.option1') }}</van-radio>
      <van-radio name="2">{{ t('demo.option2') }}</van-radio>
      <van-radio name="3">{{ t('demo.option3') }}</van-radio>
    </van-radio-group>

    <!-- Checkbox -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.checkbox') }}</div>
    <van-checkbox v-model="checkboxValue">{{ t('demo.check') }}</van-checkbox>

    <!-- Rate -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.rate') }}</div>
    <van-rate v-model="rate" />

    <!-- Slider -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.slider') }}</div>
    <van-slider v-model="sliderValue" />

    <!-- Stepper -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.stepper') }}</div>
    <van-stepper v-model="stepperValue" />

    <!-- Tag -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.tag') }}</div>
    <van-space wrap>
      <van-tag type="primary">{{ t('app.buttonPrimary') }}</van-tag>
      <van-tag type="success">{{ t('app.buttonSuccess') }}</van-tag>
      <van-tag type="danger">{{ t('app.buttonDanger') }}</van-tag>
      <van-tag type="warning">{{ t('app.buttonWarning') }}</van-tag>
      <van-tag plain type="primary">{{ t('demo.plain') }}</van-tag>
      <van-tag round type="primary">{{ t('demo.round') }}</van-tag>
    </van-space>

    <!-- Badge -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.badge') }}</div>
    <van-space class="gap-5">
      <van-badge :content="8"><van-icon name="chat-o" size="24" /></van-badge>
      <van-badge :content="99"><van-icon name="like-o" size="24" /></van-badge>
      <van-badge dot><van-icon name="star-o" size="24" /></van-badge>
    </van-space>

    <!-- Progress -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.progress') }}</div>
    <van-progress :percentage="68" />

    <!-- Notice Bar -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.notice') }}</div>
    <van-notice-bar left-icon="volume-o" :text="t('demo.noticeText')" />

    <!-- Divider -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.divider') }}</div>
    <van-divider>{{ t('demo.text') }}</van-divider>

    <!-- Empty -->
    <div class="font-600 mt-4 mb-3">{{ t('demo.empty') }}</div>
    <van-empty :description="t('mobile.empty')" />
  </div>
</template>
