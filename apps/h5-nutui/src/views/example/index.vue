<script setup lang="ts">
import { showToast } from "@nutui/nutui";
import { Dongdong, Heart, Star } from "@nutui/icons-vue";

import { t } from "@/locales";

const showNutToast = () => {
  showToast.text(t("app.toastDemo"));
};

const switchValue = ref(false);
const inputValue = ref("");
const radioValue = ref("1");
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
      <span class="inline-block mb-3 text-16px font-600">Button 按钮</span>
      <div class="flex flex-wrap gap-2">
        <nut-button type="primary" @click="showNutToast">{{ t("app.buttonPrimary") }}</nut-button>
        <nut-button type="info">{{ t("app.buttonInfo") }}</nut-button>
        <nut-button type="default">{{ t("app.buttonDefault") }}</nut-button>
        <nut-button type="danger">{{ t("app.buttonDanger") }}</nut-button>
        <nut-button type="warning">{{ t("app.buttonWarning") }}</nut-button>
        <nut-button type="success">{{ t("app.buttonSuccess") }}</nut-button>
      </div>
      <div class="flex flex-wrap gap-2 mt-2">
        <nut-button type="primary" plain>Plain</nut-button>
        <nut-button type="primary" round>Round</nut-button>
        <nut-button type="primary" size="small">Small</nut-button>
        <nut-button type="primary" size="mini">Mini</nut-button>
        <nut-button type="primary" loading>Loading</nut-button>
        <nut-button type="primary" disabled>Disabled</nut-button>
      </div>
    </section>

    <!-- Cell -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Cell 单元格</span>
      <nut-cell-group>
        <nut-cell title="标题" desc="描述" />
        <nut-cell title="带箭头" is-link />
        <nut-cell title="带图标" desc="描述">
          <template #icon><Dongdong /></template>
        </nut-cell>
      </nut-cell-group>
    </section>

    <!-- Form -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Input 输入框</span>
      <nut-input v-model="inputValue" placeholder="请输入内容" />
    </section>

    <!-- Switch -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Switch 开关</span>
      <nut-switch v-model="switchValue" />
    </section>

    <!-- Radio -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Radio 单选</span>
      <nut-radio-group v-model="radioValue" direction="horizontal">
        <nut-radio label="1">选项一</nut-radio>
        <nut-radio label="2">选项二</nut-radio>
        <nut-radio label="3">选项三</nut-radio>
      </nut-radio-group>
    </section>

    <!-- Checkbox -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Checkbox 复选</span>
      <nut-checkbox v-model="checkboxValue" label="勾选我" />
    </section>

    <!-- Rate -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Rate 评分</span>
      <nut-rate v-model="rate" />
    </section>

    <!-- Progress -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Progress 进度条</span>
      <nut-progress :percentage="progress" />
    </section>

    <!-- Range -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Range 滑块</span>
      <nut-range v-model="rangeValue" />
    </section>

    <!-- Stepper -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">InputNumber 步进器</span>
      <nut-input-number v-model="stepperValue" />
    </section>

    <!-- Tag -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Tag 标签</span>
      <div class="flex flex-wrap gap-2">
        <nut-tag type="primary">Primary</nut-tag>
        <nut-tag type="success">Success</nut-tag>
        <nut-tag type="danger">Danger</nut-tag>
        <nut-tag type="warning">Warning</nut-tag>
        <nut-tag plain>Plain</nut-tag>
        <nut-tag round type="primary">Round</nut-tag>
      </div>
    </section>

    <!-- Badge -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Badge 徽标</span>
      <div class="flex gap-5">
        <nut-badge :value="8"><Dongdong width="24" height="24" /></nut-badge>
        <nut-badge :value="99"><Star width="24" height="24" /></nut-badge>
        <nut-badge dot><Heart width="24" height="24" /></nut-badge>
      </div>
    </section>

    <!-- Empty -->
    <section class="mb-4">
      <span class="inline-block mb-3 text-16px font-600">Empty 空状态</span>
      <nut-empty description="暂无数据" />
    </section>
  </div>
</template>
