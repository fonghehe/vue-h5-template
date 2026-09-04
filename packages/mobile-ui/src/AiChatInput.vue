<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

import { $t as t } from '@vh5/locales';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    streaming?: boolean;
  }>(),
  { disabled: false, streaming: false },
);

const emit = defineEmits<{
  send: [content: string];
  stop: [];
}>();

const value = defineModel<string>({ default: '' });
const textarea = ref<HTMLTextAreaElement>();

function resize() {
  const element = textarea.value;
  if (!element) return;
  element.style.height = 'auto';
  element.style.height = `${Math.min(element.scrollHeight, 132)}px`;
}

function send() {
  const content = value.value.trim();
  if (!content || props.disabled || props.streaming) return;
  emit('send', content);
  value.value = '';
  nextTick(resize);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return;
  event.preventDefault();
  send();
}

watch(value, () => nextTick(resize));
onMounted(resize);

defineExpose({ focus: () => textarea.value?.focus() });
</script>

<template>
  <div class="chat-input safe-area-pb">
    <div class="composer">
      <textarea
        ref="textarea"
        v-model="value"
        :disabled="disabled"
        :aria-label="t('mobile.message')"
        enterkeyhint="send"
        maxlength="4000"
        :placeholder="t('mobile.ask')"
        rows="1"
        @keydown="onKeydown"
      ></textarea>
      <button
        v-if="streaming"
        class="send-button stop-button"
        :aria-label="t('mobile.stop')"
        type="button"
        @click="emit('stop')"
      >
        <span></span>
      </button>
      <button
        v-else
        class="send-button"
        :disabled="disabled || !value.trim()"
        :aria-label="t('mobile.send')"
        type="button"
        @click="send"
      >
        <span aria-hidden="true">↑</span>
      </button>
    </div>
    <p>{{ t('mobile.disclaimer') }}</p>
  </div>
</template>

<style scoped>
.chat-input {
  padding: 10px 12px 8px;
  background: rgb(250 251 253 / 96%);
  border-top: 1px solid #edf0f4;
  backdrop-filter: blur(14px);
}

.composer {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  padding: 7px 7px 7px 14px;
  background: #fff;
  border: 1px solid #dfe4eb;
  border-radius: 20px;
  box-shadow: 0 4px 18px rgb(24 42 72 / 7%);
}

textarea {
  flex: 1;
  min-width: 0;
  min-height: 32px;
  max-height: 132px;
  padding: 6px 0;
  overflow-y: auto;
  font: inherit;
  line-height: 20px;
  resize: none;
  outline: none;
  background: transparent;
  border: 0;
}

.send-button {
  display: grid;
  flex: 0 0 44px;
  place-items: center;
  width: 44px;
  height: 44px;
  color: #fff;
  background: var(--app-primary);
  border: 0;
  border-radius: 50%;
}

.send-button:disabled {
  color: #9fa7b2;
  background: #eef1f5;
}

.stop-button span {
  width: 12px;
  height: 12px;
  background: currentcolor;
  border-radius: 2px;
}

p {
  margin: 5px 0 0;
  font-size: 10px;
  color: #9aa2ad;
  text-align: center;
}
</style>
