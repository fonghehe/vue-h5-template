<script setup lang="ts">
import { Snackbar } from "@varlet/ui";
import "@varlet/ui/es/snackbar/style/index.mjs";

import { t } from "@/locales";

function demo() {
  Snackbar.success(t("app.toastDemo"));
}

const switchValue = ref(false);
const inputValue = ref("");
const radioValue = ref("1");
const checkboxValue = ref(false);
const rate = ref(3);
const sliderValue = ref(40);
const counterValue = ref(1);
</script>

<template>
  <div style="padding: 12px">
    <!-- Button -->
    <div style="font-weight: 600; margin-bottom: 12px">Button 按钮</div>
    <var-space wrap>
      <var-button type="primary" @click="demo">{{ t("app.buttonPrimary") }}</var-button>
      <var-button type="info">{{ t("app.buttonInfo") }}</var-button>
      <var-button type="success">{{ t("app.buttonSuccess") }}</var-button>
      <var-button type="danger">{{ t("app.buttonDanger") }}</var-button>
      <var-button type="warning">{{ t("app.buttonWarning") }}</var-button>
    </var-space>
    <var-space wrap style="margin-top: 8px">
      <var-button type="primary" outline>Outline</var-button>
      <var-button type="primary" round>Round</var-button>
      <var-button type="primary" size="small">Small</var-button>
      <var-button type="primary" size="mini">Mini</var-button>
      <var-button type="primary" loading>Loading</var-button>
      <var-button type="primary" disabled>Disabled</var-button>
    </var-space>

    <!-- Cell -->
    <div style="font-weight: 600; margin: 16px 0 12px">Cell 单元格</div>
    <var-cell title="标题" description="描述" />
    <var-cell title="带箭头" />
    <var-cell title="带图标" icon="information" description="描述" />

    <!-- Input -->
    <div style="font-weight: 600; margin: 16px 0 12px">Input 输入框</div>
    <var-input v-model="inputValue" placeholder="请输入内容" />

    <!-- Switch -->
    <div style="font-weight: 600; margin: 16px 0 12px">Switch 开关</div>
    <var-switch v-model="switchValue" />

    <!-- Radio -->
    <div style="font-weight: 600; margin: 16px 0 12px">Radio 单选</div>
    <var-radio-group v-model="radioValue" direction="horizontal">
      <var-radio :checked-value="'1'">选项一</var-radio>
      <var-radio :checked-value="'2'">选项二</var-radio>
      <var-radio :checked-value="'3'">选项三</var-radio>
    </var-radio-group>

    <!-- Checkbox -->
    <div style="font-weight: 600; margin: 16px 0 12px">Checkbox 复选</div>
    <var-checkbox v-model="checkboxValue">勾选我</var-checkbox>

    <!-- Rate -->
    <div style="font-weight: 600; margin: 16px 0 12px">Rate 评分</div>
    <var-rate v-model="rate" />

    <!-- Slider -->
    <div style="font-weight: 600; margin: 16px 0 12px">Slider 滑块</div>
    <var-slider v-model="sliderValue" />

    <!-- Counter -->
    <div style="font-weight: 600; margin: 16px 0 12px">Counter 计数器</div>
    <var-counter v-model="counterValue" />

    <!-- Chip -->
    <div style="font-weight: 600; margin: 16px 0 12px">Chip 标签</div>
    <var-space wrap>
      <var-chip type="primary">Primary</var-chip>
      <var-chip type="success">Success</var-chip>
      <var-chip type="danger">Danger</var-chip>
      <var-chip type="warning">Warning</var-chip>
      <var-chip plain type="primary">Plain</var-chip>
      <var-chip round type="primary">Round</var-chip>
    </var-space>

    <!-- Badge -->
    <div style="font-weight: 600; margin: 16px 0 12px">Badge 徽标</div>
    <var-space style="gap: 20px">
      <var-badge type="primary" :value="8"><var-icon name="information" :size="24" /></var-badge>
      <var-badge type="danger" :value="99"><var-icon name="star" :size="24" /></var-badge>
      <var-badge type="primary" dot><var-icon name="heart" :size="24" /></var-badge>
    </var-space>

    <!-- Progress -->
    <div style="font-weight: 600; margin: 16px 0 12px">Progress 进度条</div>
    <var-progress :value="68" />

    <!-- Divider -->
    <div style="font-weight: 600; margin: 16px 0 12px">Divider 分割线</div>
    <var-divider>文字</var-divider>

    <!-- Skeleton -->
    <div style="font-weight: 600; margin: 16px 0 12px">Skeleton 骨架屏</div>
    <var-skeleton :rows="3" :loading="true" />
  </div>
</template>
