import { describe, expect, it, vi } from 'vitest';

import { parseEventStream } from '../sse';

describe('parseEventStream', () => {
  it('handles split CRLF delimiters and multibyte UTF-8 without corruption', async () => {
    const bytes = new TextEncoder().encode(
      ': heartbeat\r\ndata: {"type":"delta","delta":"你好、日本語"}\r\n\r\ndata: {"type":"finish"}\r\n\r\n',
    );
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
        controller.close();
      },
    });
    const chunks = [];
    for await (const chunk of parseEventStream(stream)) chunks.push(chunk);
    expect(chunks).toEqual([
      { delta: '你好、日本語', type: 'delta' },
      { type: 'finish' },
    ]);
    expect(stream.locked).toBe(false);
  });

  it.each([
    'null',
    '{"type":"delta"}',
    '{"type":"delta","delta":42}',
    '{"type":"unknown"}',
    '{"type":"error","message":false}',
    '{"type":"start","id":1}',
    '{"type":"finish","reason":"invalid"}',
  ])('rejects an invalid wire event: %s', async (event) => {
    const stream = new Response(`data: ${event}\n\n`).body;
    if (!stream) throw new Error('Expected a readable response body');
    await expect(parseEventStream(stream).next()).rejects.toThrow(
      'Invalid chat stream event',
    );
    expect(stream.locked).toBe(false);
  });

  it('cancels and releases the reader when a consumer stops early', async () => {
    const cancel = vi.fn();
    const stream = new ReadableStream<Uint8Array>({
      cancel,
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode('data: {"type":"delta","delta":"Hi"}\n\n'),
        );
      },
    });
    const iterator = parseEventStream(stream);
    await iterator.next();
    await iterator.return(undefined);
    expect(cancel).toHaveBeenCalledOnce();
    expect(stream.locked).toBe(false);
  });

  it('parses events split across byte chunks', async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"type":"del'));
        controller.enqueue(encoder.encode('ta","delta":"Vue"}\n\n'));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    const chunks = [];
    for await (const chunk of parseEventStream(stream)) chunks.push(chunk);

    expect(chunks).toEqual([{ delta: 'Vue', type: 'delta' }]);
  });
});
