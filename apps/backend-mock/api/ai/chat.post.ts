import { defineEventHandler, readBody, sendStream, setHeader } from 'h3';

interface ChatMessage {
  content: string;
  id: string;
  role: 'assistant' | 'system' | 'user';
}

const encoder = new TextEncoder();

function event(payload: object) {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function answerFor(prompt: string) {
  if (/vue/i.test(prompt)) {
    return `Vue is a progressive JavaScript framework for building user interfaces.

It keeps components approachable while scaling to complete applications with:

- reactive state
- reusable Single-File Components
- a strong TypeScript experience

\`\`\`ts
import { ref } from 'vue';

const count = ref(0);
\`\`\`

This response is streamed from the local Nitro mock server.`;
  }
  return `I received: **${prompt}**

This is a provider-neutral streaming demo. Replace the mock endpoint with an OpenAI, Claude, Gemini, DeepSeek, or custom server adapter without changing the chat UI.`;
}

function chunkText(text: string) {
  return text.match(/.{1,8}(?:\s|$)|.{1,8}/gu) ?? [text];
}

export default defineEventHandler(async (requestEvent) => {
  const body = await readBody<{ messages?: ChatMessage[] }>(requestEvent);
  const prompt = body.messages?.findLast(
    (message) => message.role === 'user',
  )?.content;
  const answer = answerFor(prompt?.trim() || 'Hello');

  setHeader(requestEvent, 'Cache-Control', 'no-cache, no-transform');
  setHeader(requestEvent, 'Connection', 'keep-alive');
  setHeader(requestEvent, 'Content-Type', 'text/event-stream; charset=utf-8');
  setHeader(requestEvent, 'X-Accel-Buffering', 'no');

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(event({ id: crypto.randomUUID(), type: 'start' }));
      for (const delta of chunkText(answer)) {
        if (requestEvent.node.req.aborted || requestEvent.node.res.destroyed) {
          break;
        }
        controller.enqueue(event({ delta, type: 'delta' }));
        await new Promise((resolve) => setTimeout(resolve, 45));
      }
      if (!requestEvent.node.req.aborted && !requestEvent.node.res.destroyed) {
        controller.enqueue(event({ reason: 'stop', type: 'finish' }));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      }
      controller.close();
    },
  });

  return sendStream(requestEvent, stream);
});
