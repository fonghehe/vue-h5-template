import type {
  ChatMessage,
  ChatProvider,
  ChatStatus,
  StreamingChatOptions,
} from './types';

import { computed, reactive, readonly, ref } from 'vue';

const defaultCreateId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `message-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function useStreamingChat(
  provider: ChatProvider,
  options: StreamingChatOptions = {},
) {
  const createId = options.createId ?? defaultCreateId;
  const now = options.now ?? Date.now;
  const messages = ref<ChatMessage[]>(
    (options.initialMessages ?? []).map((message) => ({ ...message })),
  );
  const status = ref<ChatStatus>('idle');
  const error = ref<Error>();
  let controller: AbortController | undefined;

  const streaming = computed(
    () => status.value === 'streaming' || status.value === 'submitting',
  );

  async function generate() {
    controller?.abort();
    const currentController = new AbortController();
    controller = currentController;
    error.value = undefined;
    status.value = 'submitting';
    const assistant = reactive<ChatMessage>({
      content: '',
      createdAt: now(),
      id: createId(),
      role: 'assistant',
    });
    messages.value.push(assistant);

    try {
      const history = messages.value.slice(0, -1);
      for await (const chunk of provider.chat(history, {
        signal: currentController.signal,
      })) {
        // A cancelled provider may still yield or reject after a new request starts.
        if (
          controller !== currentController ||
          currentController.signal.aborted
        )
          return;
        if (chunk.type === 'start') status.value = 'streaming';
        if (chunk.type === 'delta') {
          status.value = 'streaming';
          assistant.content += chunk.delta;
        }
        if (chunk.type === 'error') throw new Error(chunk.message);
      }
      if (controller === currentController) status.value = 'idle';
    } catch (caughtError) {
      if (controller !== currentController) return;
      if (currentController.signal.aborted) {
        status.value = 'idle';
        return;
      }
      error.value =
        caughtError instanceof Error ? caughtError : new Error('Chat failed');
      status.value = 'error';
    } finally {
      if (controller === currentController) controller = undefined;
    }
  }

  async function sendMessage(content: string) {
    const normalized = content.trim();
    if (!normalized || streaming.value) return;
    messages.value.push({
      content: normalized,
      createdAt: now(),
      id: createId(),
      role: 'user',
    });
    await generate();
  }

  async function regenerate() {
    if (streaming.value) return;
    const lastAssistantIndex = messages.value.findLastIndex(
      (message) => message.role === 'assistant',
    );
    if (lastAssistantIndex === -1) return;
    messages.value.splice(lastAssistantIndex, 1);
    await generate();
  }

  async function retry() {
    if (status.value !== 'error') return;
    const lastMessage = messages.value.at(-1);
    if (lastMessage?.role === 'assistant') messages.value.pop();
    await generate();
  }

  function abort() {
    const activeController = controller;
    if (!activeController) return;
    controller = undefined;
    status.value = 'idle';
    activeController.abort();
  }

  function clear() {
    abort();
    messages.value = [];
    error.value = undefined;
    status.value = 'idle';
  }

  return {
    abort,
    clear,
    error: readonly(error),
    messages: readonly(messages),
    regenerate,
    retry,
    sendMessage,
    status: readonly(status),
    streaming,
  };
}
