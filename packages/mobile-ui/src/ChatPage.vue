<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

import { FetchChatProvider, useStreamingChat } from '@vh5/ai-chat';
import { useI18n } from '@vh5/locales';

import AiChatInput from './AiChatInput.vue';
import MarkdownContent from './MarkdownContent.vue';

const props = defineProps<{ endpoint?: string; token?: string }>();
const { t, locale } = useI18n();
const notice = ref('');
const provider = new FetchChatProvider({
  endpoint: props.endpoint || '/api/ai/chat',
  headers: () => {
    const headers = new Headers({ 'Accept-Language': locale.value });
    if (props.token) {
      headers.set('Authorization', `Bearer ${props.token}`);
    }
    return headers;
  },
});
const {
  abort,
  error,
  messages,
  regenerate,
  retry,
  sendMessage,
  status,
  streaming,
} = useStreamingChat(provider);

onBeforeUnmount(abort);

const draft = ref('');
const messageScroller = ref<HTMLElement>();
const showScrollButton = ref(false);
const suggestions = computed(() =>
  [0, 1, 2].map((index) => t(`mobile.prompt${index}`)),
);

function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
  nextTick(() => {
    messageScroller.value?.scrollTo({
      behavior,
      top: messageScroller.value.scrollHeight,
    });
  });
}

async function submit(content: string) {
  scrollToBottom();
  await sendMessage(content);
}

async function copy(content: string) {
  try {
    await navigator.clipboard.writeText(content);
    notice.value = t('mobile.copied');
  } catch {
    notice.value = t('mobile.copyFailed');
  }
}

function updateScrollState() {
  const element = messageScroller.value;
  if (!element) return;
  showScrollButton.value =
    element.scrollHeight - element.scrollTop - element.clientHeight > 120;
}

watch(
  () => messages.value.map((message) => message.content).join(''),
  () => {
    if (!showScrollButton.value) scrollToBottom('auto');
  },
);
</script>

<template>
  <section class="chat-page">
    <div
      ref="messageScroller"
      class="message-scroller"
      @scroll.passive="updateScrollState"
    >
      <div v-if="messages.length === 0" class="empty-state">
        <div class="brand-mark"><span aria-hidden="true">✦</span></div>
        <h1>{{ t('mobile.chatTitle') }}</h1>
        <p>{{ t('mobile.chatIntro') }}</p>
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          type="button"
          @click="submit(suggestion)"
        >
          {{ suggestion }}
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <article
        v-for="message in messages"
        :key="message.id"
        class="message"
        :class="`message-${message.role}`"
      >
        <div v-if="message.role === 'assistant'" class="avatar">V</div>
        <div class="message-body">
          <MarkdownContent v-if="message.content" :content="message.content" />
          <div v-else class="thinking" :aria-label="t('mobile.thinking')">
            <i></i><i></i><i></i>
          </div>
          <div
            v-if="message.role === 'assistant' && message.content"
            class="message-actions"
          >
            <button
              type="button"
              :aria-label="t('mobile.copy')"
              @click="copy(message.content)"
            >
              <span aria-hidden="true">⧉</span>
            </button>
            <button
              v-if="message.id === messages.at(-1)?.id && !streaming"
              type="button"
              :aria-label="t('mobile.regenerate')"
              @click="regenerate"
            >
              <span aria-hidden="true">↻</span>
            </button>
          </div>
        </div>
      </article>

      <div v-if="status === 'error'" class="error-card">
        <span>{{ error?.message || t('mobile.interrupted') }}</span>
        <button type="button" @click="retry">{{ t('mobile.retry') }}</button>
      </div>
    </div>

    <button
      v-show="showScrollButton"
      class="scroll-button"
      type="button"
      :aria-label="t('mobile.scrollBottom')"
      @click="scrollToBottom()"
    >
      <span aria-hidden="true">↓</span>
    </button>

    <p v-if="notice" class="copy-notice" role="status">{{ notice }}</p>
    <AiChatInput
      v-model="draft"
      :streaming="streaming"
      @send="submit"
      @stop="abort"
    />
  </section>
</template>

<style scoped>
.copy-notice {
  padding: 4px 12px;
  margin: 0;
  font-size: 12px;
  color: var(--app-primary-deep);
}

.chat-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  color: #202631;
  background:
    radial-gradient(
      circle at 10% 5%,
      rgb(var(--app-primary-rgb) / 10%),
      transparent 28%
    ),
    var(--app-surface);
}

.message-scroller {
  flex: 1;
  min-height: 0;
  padding: 18px 14px 30px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.empty-state {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  min-height: 100%;
  padding: 34px 8px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  font-size: 24px;
  color: #fff;
  background: linear-gradient(
    145deg,
    var(--app-primary),
    var(--app-primary-deep)
  );
  border-radius: 15px;
  box-shadow: 0 12px 25px rgb(var(--app-primary-rgb) / 22%);
}

.empty-state h1 {
  margin: 6px 0 0;
  font-size: 23px;
}

.empty-state p {
  margin: 0 0 12px;
  font-size: 14px;
  color: #747e8c;
}

.empty-state button {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 14px 15px;
  color: #343b47;
  text-align: left;
  background: rgb(255 255 255 / 88%);
  border: 1px solid #e5e9ee;
  border-radius: 14px;
}

.message {
  display: flex;
  gap: 9px;
  margin-bottom: 20px;
}

.message-user {
  justify-content: flex-end;
  padding-left: 45px;
}

.message-user .message-body {
  padding: 10px 13px;
  background: var(--app-primary-soft);
  border-radius: 16px 16px 4px;
}

.message-assistant {
  padding-right: 18px;
}

.avatar {
  display: grid;
  flex: 0 0 28px;
  place-items: center;
  width: 28px;
  height: 28px;
  font-weight: 700;
  color: #fff;
  background: var(--app-primary);
  border-radius: 9px;
}

.message-body {
  min-width: 0;
}

.message-actions {
  display: flex;
  gap: 4px;
  margin-top: 5px;
}

.message-actions button,
.scroll-button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: #7e8793;
  background: #fff;
  border: 1px solid #e4e8ed;
  border-radius: 50%;
}

.thinking {
  display: flex;
  gap: 4px;
  padding: 9px 0;
}

.thinking i {
  width: 6px;
  height: 6px;
  background: #8d98a5;
  border-radius: 50%;
  animation: pulse 1.2s infinite ease-in-out;
}

.thinking i:nth-child(2) {
  animation-delay: 150ms;
}

.thinking i:nth-child(3) {
  animation-delay: 300ms;
}

.error-card {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 11px 13px;
  font-size: 13px;
  color: #a63737;
  background: #fff1f1;
  border-radius: 10px;
}

.error-card button {
  color: inherit;
  text-decoration: underline;
  background: transparent;
  border: 0;
}

.scroll-button {
  position: absolute;
  right: 16px;
  bottom: calc(94px + env(safe-area-inset-bottom));
  z-index: 2;
  box-shadow: 0 6px 18px rgb(20 30 45 / 12%);
}

@keyframes pulse {
  0%,
  80%,
  100% {
    opacity: 0.35;
    transform: scale(0.75);
  }

  40% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .thinking i {
    animation: none;
  }
}
</style>
