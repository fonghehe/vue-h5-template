import { describe, expect, it } from 'vitest';

import { createBackendProxy } from '../backend-proxy';

describe('createBackendProxy', () => {
  it('routes every API request to Nitro in mock mode', () => {
    const proxy = createBackendProxy({ VITE_NITRO_MOCK: 'true' });

    expect(proxy).toEqual({
      '/api': { changeOrigin: true, target: 'http://localhost:5320' },
    });
  });

  it('routes AI and business requests to separate services', () => {
    const proxy = createBackendProxy({
      VITE_AI_API_TARGET: 'http://localhost:8001',
      VITE_API_TARGET: 'http://localhost:8002',
      VITE_NITRO_MOCK: 'false',
    });

    expect(Object.keys(proxy)).toEqual(['/api/ai', '/api']);
    expect(proxy['/api/ai']?.target).toBe('http://localhost:8001');
    expect(proxy['/api']?.target).toBe('http://localhost:8002');
  });

  it('leaves production gateway routing untouched without targets', () => {
    expect(createBackendProxy({ VITE_NITRO_MOCK: 'false' })).toEqual({});
  });
});
