import { describe, expect, it } from 'vitest';

import { parseEventStream } from '../sse';

describe('parseEventStream', () => {
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
