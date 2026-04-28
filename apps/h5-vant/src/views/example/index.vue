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
  <div style="padding: 12px">
    <!-- Button -->
    <div style="font-weight: 600; margin-bottom: 12px">Button 按钮</div>
    <van-space direction="vertical" fill>
      <van-space wrap>
        <van-button type="primary" @click="demo">{{ t('app.buttonPrimary') }}</van-button>
        <van-button type="success">{{ t('app.buttonSuccess') }}</van-button>
        <van-button type="default">{{ t('app.buttonDefault') }}</van-button>
        <van-button type="danger">{{ t('app.buttonDanger') }}</van-button>
        <van-button type="warning">{{ t('app.buttonWarning') }}</van-button>
      </van-space>
      <van-space wrap>
        <van-button type="primary" plain>Plain</van-button>
        <van-button type="primary" round>Round</van-button>
        <van-button type="primary" size="small">Small</van-button>
        <van-button type="primary" size="mini">Mini</van-button>
        <van-button type="primary" loading loading-text="Loading" />
        <van-button type="primary" disabled>Disabled</van-button>
      </van-space>
    </van-space>

    <!-- Cell -->
    <div style="font-weight: 600; margin: 16px 0 12px">Cell 单元格</div>
    <van-cell-group inset>
      <van-cell title="标题" value="内容" />
      <van-cell title="带箭头" is-link />
      <van-cell title="带图标" icon="location-o" value="描述" />
    </van-cell-group>

    <!-- Field -->
    <div style="font-weight: 600; margin: 16px 0 12px">Field 输入框</div>
    <van-cell-group inset>
      <van-field v-model="inputValue" label="文本" placeholder="请输入内容" />
    </van-cell-group>

    <!-- Switch -->
    <div style="font-weight: 600; margin: 16px 0 12px">Switch 开关</div>
    <van-switch v-model="switchValue" />

    <!-- Radio -->
    <div style="font-weight: 600; margin: 16px 0 12px">Radio 单选</div>
    <van-radio-group v-model="radioValue" direction="horizontal">
      <van-radio name="1">选项一</van-radio>
      <van-radio name="2">选项二</van-radio>
      <van-radio name="3">选项三</van-radio>
    </van-radio-group>

    <!-- Checkbox -->
    <div style="font-weight: 600; margin: 16px 0 12px">Checkbox 复选</div>
    <van-checkbox v-model="checkboxValue">勾选我</van-checkbox>

    <!-- Rate -->
    <div style="font-weight: 600; margin: 16px 0 12px">Rate 评分</div>
    <van-rate v-model="rate" />

    <!-- Slider -->
    <div style="font-weight: 600; margin: 16px 0 12px">Slider 滑块</div>
    <van-slider v-model="sliderValue" />

    <!-- Stepper -->
    <div style="font-weight: 600; margin: 16px 0 12px">Stepper 步进器</div>
    <van-stepper v-model="stepperValue" />

    <!-- Tag -->
    <div style="font-weight: 600; margin: 16px 0 12px">Tag 标签</div>
    <van-space wrap>
      <van-tag type="primary">Primary</van-tag>
      <van-tag type="success">Success</van-tag>
      <van-tag type="danger">Danger</van-tag>
      <van-tag type="warning">Warning</van-tag>
      <van-tag plain type="primary">Plain</van-tag>
      <van-tag round type="primary">Round</van-tag>
    </van-space>

    <!-- Badge -->
    <div style="font-weight: 600; margin: 16px 0 12px">Badge 徽标</div>
    <van-space style="gap: 20px">
      <van-badge :content="8"><van-icon name="chat-o" size="24" /></van-badge>
      <van-badge :content="99"><van-icon name="like-o" size="24" /></van-badge>
      <van-badge dot><van-icon name="star-o" size="24" /></van-badge>
    </van-space>

    <!-- Progress -->
    <div style="font-weight: 600; margin: 16px 0 12px">Progress 进度条</div>
    <van-progress :percentage="68" />

    <!-- Notice Bar -->
    <div style="font-weight: 600; margin: 16px 0 12px">NoticeBar 通知栏</div>
    <van-notice-bar left-icon="volume-o" text="这是一条通知消息，用于展示 Vant 的 NoticeBar 组件效果" />

    <!-- Divider -->
    <div style="font-weight: 600; margin: 16px 0 12px">Divider 分割线</div>
    <van-divider>文字</van-divider>

    <!-- Empty -->
    <div style="font-weight: 600; margin: 16px 0 12px">Empty 空状态</div>
    <van-empty description="暂无数据" />
  </div>
</template>
