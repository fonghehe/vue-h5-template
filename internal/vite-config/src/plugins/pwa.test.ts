import { VitePWA } from 'vite-plugin-pwa';
import { describe, expect, it, vi } from 'vitest';

import { defineApplicationConfig } from '../config/application';

vi.mock('vite-plugin-pwa', () => ({ VitePWA: vi.fn(() => []) }));

describe('application PWA options', () => {
  it('keeps an explicit manifest opt-out and merges Workbox settings', async () => {
    await defineApplicationConfig(async () => ({
      application: {
        pwa: true,
        pwaOptions: {
          manifest: false,
          workbox: {
            globPatterns: ['**/*.html'],
            navigateFallbackDenylist: [/^\/health$/],
          },
        },
      },
    }))({ command: 'build', mode: 'test' });

    expect(VitePWA).toHaveBeenLastCalledWith(
      expect.objectContaining({
        manifest: false,
        workbox: expect.objectContaining({
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.html'],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//, /^\/health$/],
        }),
      }),
    );
  });

  it('preserves default manifest metadata when an app overrides its theme', async () => {
    await defineApplicationConfig(async () => ({
      application: {
        pwa: true,
        pwaOptions: { manifest: { theme_color: '#0052d9' } },
      },
    }))({ command: 'build', mode: 'test' });

    expect(VitePWA).toHaveBeenLastCalledWith(
      expect.objectContaining({
        manifest: expect.objectContaining({
          icons: expect.arrayContaining([
            expect.objectContaining({ src: '/pwa-192x192.png' }),
          ]),
          name: 'Vue H5 Template',
          theme_color: '#0052d9',
        }),
      }),
    );
  });
});
