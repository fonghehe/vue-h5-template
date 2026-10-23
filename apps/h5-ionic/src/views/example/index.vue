<script setup lang="ts">
import { computed, ref } from 'vue';

import { $t as t } from '@vh5/locales';

import {
  IonButton,
  IonCheckbox,
  IonChip,
  IonInput,
  IonProgressBar,
  IonRange,
  IonToast,
  IonToggle,
} from '@ionic/vue';

const input = ref('');
const enabled = ref(false);
const checked = ref(false);
const range = ref(40);
const progress = computed(() => range.value / 100);
const toastOpen = ref(false);
</script>

<template>
  <div class="p-4">
    <h2>{{ t('demo.button') }}</h2>
    <div class="flex flex-wrap gap-2">
      <IonButton @click="toastOpen = true">
        {{ t('app.buttonPrimary') }}
      </IonButton>
      <IonButton color="danger" fill="outline">
        {{ t('app.buttonDanger') }}
      </IonButton>
      <IonButton disabled>{{ t('demo.disabled') }}</IonButton>
    </div>
    <IonToast
      :is-open="toastOpen"
      :message="t('app.toastDemo')"
      :duration="1500"
      @did-dismiss="toastOpen = false"
    />

    <h2>{{ t('demo.input') }}</h2>
    <IonInput
      v-model="input"
      fill="outline"
      :label="t('demo.input')"
      :placeholder="t('demo.placeholder')"
    />
    <h2>{{ t('demo.switch') }}</h2>
    <IonToggle v-model="enabled">{{ t('demo.switch') }}</IonToggle>
    <h2>{{ t('demo.checkbox') }}</h2>
    <IonCheckbox v-model="checked">{{ t('demo.check') }}</IonCheckbox>
    <h2>{{ t('demo.slider') }}</h2>
    <IonRange
      :value="range"
      :label="t('demo.slider')"
      @ion-change="range = Number($event.detail.value)"
    />
    <h2>{{ t('demo.progress') }}</h2>
    <IonProgressBar :value="progress" :aria-label="t('demo.progress')" />
    <h2>{{ t('demo.tag') }}</h2>
    <IonChip color="primary">{{ t('app.buttonPrimary') }}</IonChip>
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
