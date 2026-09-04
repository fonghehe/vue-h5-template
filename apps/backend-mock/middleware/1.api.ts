import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const origin = event.headers.get('Origin');
  const allowedOrigins = new Set(
    (
      process.env.MOCK_ALLOWED_ORIGINS ??
      'http://localhost:5777,http://localhost:5778,http://localhost:5779'
    )
      .split(',')
      .map((item) => item.trim()),
  );
  if (origin && allowedOrigins.has(origin)) {
    event.node.res.setHeader('Access-Control-Allow-Origin', origin);
    event.node.res.setHeader('Access-Control-Allow-Credentials', 'true');
    event.node.res.setHeader('Vary', 'Origin');
  }
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = 'No Content.';
    return 'OK';
  }
});
