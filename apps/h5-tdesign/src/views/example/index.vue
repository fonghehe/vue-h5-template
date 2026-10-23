<script setup lang="ts">
import { ref } from 'vue';

import { $t as t } from '@vh5/locales';

import {
  Button as TButton,
  Checkbox as TCheckbox,
  Input as TInput,
  Progress as TProgress,
  Slider as TSlider,
  Switch as TSwitch,
  Tag as TTag,
} from 'tdesign-mobile-vue';

const input = ref('');
const enabled = ref(false);
const checked = ref(false);
const progress = ref(40);
const messageVisible = ref(false);
</script>

<template>
  <div class="p-4">
    <h2>{{ t('demo.button') }}</h2>
    <div class="flex flex-wrap gap-2">
      <TButton theme="primary" @click="messageVisible = !messageVisible">
        {{ t('app.buttonPrimary') }}
      </TButton>
      <TButton theme="danger" variant="outline">
        {{ t('app.buttonDanger') }}
      </TButton>
      <TButton disabled>{{ t('demo.disabled') }}</TButton>
    </div>
    <p v-if="messageVisible" role="status">{{ t('app.toastDemo') }}</p>

    <h2>{{ t('demo.input') }}</h2>
    <TInput
      v-model="input"
      :label="t('demo.input')"
      :placeholder="t('demo.placeholder')"
    />
    <h2>{{ t('demo.switch') }}</h2>
    <TSwitch v-model="enabled" :aria-label="t('demo.switch')" />
    <h2>{{ t('demo.checkbox') }}</h2>
    <TCheckbox v-model="checked">{{ t('demo.check') }}</TCheckbox>
    <h2>{{ t('demo.slider') }}</h2>
    <TSlider v-model="progress" :aria-label="t('demo.slider')" />
    <h2>{{ t('demo.progress') }}</h2>
    <TProgress :percentage="progress" />
    <h2>{{ t('demo.tag') }}</h2>
    <TTag theme="primary">{{ t('app.buttonPrimary') }}</TTag>
  </div>
</template>

<style scoped>
h2 {
  margin-block: 18px 8px;
  font-size: 16px;
}

h2:first-child {
  margin-top: 0;
}
</style>
