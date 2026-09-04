import type { ChatChunk } from './types';

function parseFrame(frame: string): ChatChunk | undefined {
  const data = frame
    .split(/\r?\n/)
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trimStart())
    .join('\n');
  if (!data || data === '[DONE]') return undefined;
  const parsed: unknown = JSON.parse(data);
  if (typeof parsed !== 'object' || parsed === null || !('type' in parsed)) {
    throw new TypeError('Invalid chat stream event');
  }
  return parsed as ChatChunk;
}

export async function* parseEventStream(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<ChatChunk> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder
        .decode(value, { stream: !done })
        .replaceAll('\r\n', '\n');
      let boundary = buffer.indexOf('\n\n');
      while (boundary >= 0) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const event = parseFrame(frame);
        if (event) yield event;
        boundary = buffer.indexOf('\n\n');
      }
      if (done) break;
    }
    const event = parseFrame(buffer);
    if (event) yield event;
  } finally {
    reader.releaseLock();
  }
}
