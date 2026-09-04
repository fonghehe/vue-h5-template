// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_CHAT_ENDPOINT?: string;
  readonly VITE_APP_NAMESPACE: string;
  readonly VITE_APP_STORE_SECURE_KEY: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_GLOB_API_URL?: string;
  readonly VITE_IMAGE_OPTIMIZE?: 'false' | 'true';
  readonly VITE_PWA_ENABLED?: 'false' | 'true';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
