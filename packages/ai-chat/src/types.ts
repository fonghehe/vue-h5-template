export type ChatRole = 'assistant' | 'system' | 'user';
export type ChatStatus = 'error' | 'idle' | 'streaming' | 'submitting';

export interface ChatMessage {
  content: string;
  createdAt: number;
  id: string;
  role: ChatRole;
}

export type ChatChunk =
  | { delta: string; type: 'delta' }
  | { id?: string; type: 'start' }
  | { message: string; type: 'error' }
  | { reason?: 'abort' | 'error' | 'stop'; type: 'finish' };

export interface ChatOptions {
  conversationId?: string;
  signal?: AbortSignal;
}

export interface ChatProvider {
  chat(
    messages: readonly ChatMessage[],
    options?: ChatOptions,
  ): AsyncIterable<ChatChunk>;
}

export interface StreamingChatOptions {
  createId?: () => string;
  initialMessages?: ChatMessage[];
  now?: () => number;
}
