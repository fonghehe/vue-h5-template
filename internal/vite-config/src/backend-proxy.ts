import type { ProxyOptions } from 'vite';

export interface BackendProxyEnv {
  VITE_AI_API_BASE_URL?: string;
  VITE_AI_API_TARGET?: string;
  VITE_API_TARGET?: string;
  VITE_GLOB_API_URL?: string;
  VITE_MOCK_API_TARGET?: string;
  VITE_NITRO_MOCK?: string;
}

function createProxy(target: string): ProxyOptions {
  return {
    changeOrigin: true,
    target,
  };
}

/**
 * Builds the development proxy shared by every H5 app.
 *
 * Mock mode sends all API traffic to Nitro. Service mode gives the more
 * specific AI prefix its own target before falling back to the business API.
 */
export function createBackendProxy(
  env: BackendProxyEnv,
): Record<string, ProxyOptions> {
  const apiBaseUrl = env.VITE_GLOB_API_URL || '/api';
  if (!apiBaseUrl.startsWith('/')) return {};

  if (env.VITE_NITRO_MOCK === 'true') {
    return {
      [apiBaseUrl]: createProxy(
        env.VITE_MOCK_API_TARGET || 'http://localhost:5320',
      ),
    };
  }

  const proxy: Record<string, ProxyOptions> = {};
  const aiApiBaseUrl =
    env.VITE_AI_API_BASE_URL || `${apiBaseUrl.replace(/\/$/u, '')}/ai`;

  // Object insertion order matters: /api/ai must be matched before /api.
  if (env.VITE_AI_API_TARGET && aiApiBaseUrl.startsWith('/')) {
    proxy[aiApiBaseUrl] = createProxy(env.VITE_AI_API_TARGET);
  }
  if (env.VITE_API_TARGET) {
    proxy[apiBaseUrl] = createProxy(env.VITE_API_TARGET);
  }

  return proxy;
}
