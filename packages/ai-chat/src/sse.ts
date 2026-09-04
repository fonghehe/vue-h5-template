import type { ChatChunk } from './types';

function isChatChunk(value: unknown): value is ChatChunk {
  if (typeof value !== 'object' || value === null || !('type' in value))
    return false;
  switch (value.type) {
    case 'delta': {
      return 'delta' in value && typeof value.delta === 'string';
    }
    case 'error': {
      return 'message' in value && typeof value.message === 'string';
    }
    case 'finish': {
      return (
        !('reason' in value) ||
        value.reason === 'stop' ||
        value.reason === 'abort' ||
        value.reason === 'error'
      );
    }
    case 'start': {
      return !('id' in value) || typeof value.id === 'string';
    }
    default: {
      return false;
    }
  }
}

function parseFrame(frame: string): ChatChunk | undefined {
  const data = frame
    .split(/\r?\n/)
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trimStart())
    .join('\n');
  if (!data || data === '[DONE]') return undefined;
  const parsed: unknown = JSON.parse(data);
  if (!isChatChunk(parsed)) {
    throw new TypeError('Invalid chat stream event');
  }
  return parsed;
}

export async function* parseEventStream(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<ChatChunk> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let completed = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      // Normalize after concatenation: CR and LF may arrive in separate reads.
      buffer = (buffer + decoder.decode(value, { stream: !done })).replaceAll(
        '\r\n',
        '\n',
      );
      let boundary = buffer.indexOf('\n\n');
      while (boundary >= 0) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const event = parseFrame(frame);
        if (event) yield event;
        boundary = buffer.indexOf('\n\n');
      }
      if (done) {
        completed = true;
        break;
      }
    }
    const event = parseFrame(buffer);
    if (event) yield event;
  } finally {
    // Early consumer return or malformed data must not leave the transport open.
    if (!completed) await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
