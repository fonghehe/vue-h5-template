import type { CAC } from 'cac';

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { colors, consola, findMonorepoRoot } from '@vh5/node-utils';

import { cancel, isCancel, select, text } from '@clack/prompts';

type UILibrary = 'nutui' | 'vant' | 'varlet';

interface AppTemplate {
  cssImports?: string;
  devPort: number;
  uiImport: string;
  uiLib: string;
  uiPackage: string;
  uiSetup: string;
}

const UI_TEMPLATES: Record<UILibrary, AppTemplate> = {
  nutui: {
    devPort: 5780,
    uiImport: '',
    uiLib: 'nut',
    uiPackage: '"@nutui/nutui": "catalog:", "@nutui/icons-vue": "catalog:"',
    uiSetup: '',
    cssImports:
      "import '@nutui/nutui/dist/packages/toast/style/css';\n" +
      "import '@nutui/nutui/dist/packages/notify/style/css';\n" +
      "import '@nutui/nutui/dist/packages/dialog/style/css';\n" +
      "import '@nutui/nutui/dist/packages/imagepreview/style/css';",
  },
  vant: {
    devPort: 5781,
    // VantResolver 按需注入组件 CSS，bootstrap.ts 无需手动导入
    uiImport: '',
    uiLib: 'vant',
    uiPackage: '"vant": "catalog:"',
    uiSetup: '',
  },
  varlet: {
    devPort: 5782,
    // Varlet 按需加载：移除全量注册，VarletImportResolver 处理模板组件 CSS，Snackbar 在使用处手动导入
    uiImport: '',
    uiLib: 'varlet',
    uiPackage: '"@varlet/ui": "catalog:"',
    uiSetup: '',
  },
};

function generatePackageJson(name: string, template: AppTemplate): string {
  return `{
  "name": "@vh5/${name}",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --mode development",
    "build": "pnpm vite build --mode production",
    "build:analyze": "pnpm vite build --mode analyze",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.node.json"
  },
  "dependencies": {
    "@vh5/api-client": "workspace:*",
    "@vh5/locales": "workspace:*",
    "@vh5/stores": "workspace:*",
    "@vh5/styles": "workspace:*",
    "@vh5/utils": "workspace:*",
    "@vueuse/core": "catalog:",
    "@vueuse/integrations": "catalog:",
    "pinia": "catalog:",
    ${template.uiPackage},
    "vue": "catalog:",
    "vue-router": "catalog:"
  },
  "devDependencies": {
    "@types/node": "catalog:",
    "@vitejs/plugin-vue": "catalog:",
    "@vitejs/plugin-vue-jsx": "catalog:",
    "typescript": "catalog:",
    "vite": "catalog:",
    "vue-tsc": "catalog:"
  }
}
`;
}

function generateViteConfig(ui: UILibrary, name: string): string {
  const scssBlock =
    ui === 'nutui'
      ? `
      css: {
        preprocessorOptions: {
          scss: {
            // 仅对 app 自身的 scss 文件注入 nutui 变量，避免污染 packages/styles 等第三方包
            additionalData: (source: string, filename: string) => {
              if (filename.includes('/apps/${name}/src/')) {
                return \`@use "@nutui/nutui/dist/styles/variables.scss" as *;\\n\${source}\`;
              }
              return source;
            },
            quietDeps: true,
          },
        },
      },`
      : '';

  return `import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      uiLibrary: '${UI_TEMPLATES[ui].uiLib}',
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            target: 'http://localhost:5320',
            ws: true,
          },
        },
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('src', import.meta.url)),
          '#': fileURLToPath(new URL('types', import.meta.url)),
        },
      },${scssBlock}
    },
  };
});
`;
}

function generateBootstrap(ui: UILibrary, template: AppTemplate): string {
  const userStoreImport =
    ui === 'nutui'
      ? "import { useUserStore } from './stores/modules/user';"
      : "import { useUserStore } from './stores/user';";

  return `import { createApp, watchEffect } from 'vue';

import { configureApiClient } from '@vh5/api-client';
import { initStores } from '@vh5/stores';
import { useTitle } from '@vueuse/core';
${template.uiImport ? `\n${template.uiImport}\n` : ''}
import App from './App.vue';
import { setupI18n } from './locales';
import router from './router';
${userStoreImport}

import 'virtual:uno.css';
import '@vh5/styles/global';
${template.cssImports ? `${template.cssImports}\n` : ''}
async function bootstrap(namespace: string) {
  const app = createApp(App);
  await setupI18n(app);
  await initStores(app, { namespace });
  const userStore = useUserStore();
  configureApiClient({
    getAccessToken: () => userStore.token,
    onUnauthorized: async () => {
      userStore.clearSession();
      const current = router.currentRoute.value;
      if (current.name !== 'login') {
        await router.replace({
          name: 'login',
          query: { redirect: current.fullPath },
        });
      }
    },
  });
  app.use(router);
  ${template.uiSetup}
  app.mount('#app');

  watchEffect(() => {
    const routeTitle = router.currentRoute.value.meta?.title as string | undefined;
    const appTitle = import.meta.env.VITE_APP_TITLE || 'Vue H5 Template';
    const pageTitle = routeTitle ? \`\${routeTitle} - \${appTitle}\` : appTitle;
    useTitle(pageTitle);
  });
}

export { bootstrap };
`;
}

function generateMainTs(): string {
  return `import { unmountGlobalLoading } from '@vh5/utils';

async function initApplication() {
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = \`\${import.meta.env.VITE_APP_NAMESPACE}-\${appVersion}-\${env}\`;

  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  unmountGlobalLoading();
}

initApplication();
`;
}

function generateAppVue(): string {
  return `<script setup lang="ts"></script>

<template>
  <RouterView />
</template>
`;
}

function generateIndexHtml(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, viewport-fit=cover"
    />
    <meta name="theme-color" content="#1989fa" />
    <meta name="description" content="Vue 3 mobile H5 application" />
    <title>%VITE_APP_TITLE%</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`;
}

function generateEnvDevelopment(name: string, port: number): string {
  return `VITE_APP_NAMESPACE=vh5-web-${name}
VITE_APP_TITLE=Vue H5 Template

# 端口号
VITE_PORT=${port}

VITE_BASE=/

# 接口地址
VITE_GLOB_API_URL=/api

# 是否开启 Nitro Mock服务，true 为开启，false 为关闭
VITE_NITRO_MOCK=true

# 是否打开 devtools，true 为打开，false 为关闭
VITE_DEVTOOLS=false

# 是否注入全局loading
VITE_INJECT_APP_LOADING=true
`;
}

function generateEnvProduction(name: string): string {
  return `VITE_APP_NAMESPACE=vh5-web-${name}
VITE_APP_TITLE=Vue H5 Template
VITE_NITRO_MOCK=false
VITE_PWA_ENABLED=false
VITE_IMAGE_OPTIMIZE=false
`;
}

function generateRouter(): string {
  return `import { createRouter, createWebHistory } from 'vue-router';
import { startProgress, stopProgress } from '@vh5/utils';

import Layout from '@/layout/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '首页' },
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('@/views/list/index.vue'),
          meta: { title: '列表' },
        },
        {
          path: 'mine',
          name: 'mine',
          component: () => import('@/views/mine/index.vue'),
          meta: { title: '我的' },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login/index.vue'),
          meta: { title: '登录' },
        },
      ],
    },
  ],
});

router.beforeEach(() => {
  startProgress();
});

router.afterEach(() => {
  stopProgress();
});

export default router;
`;
}

function generateTsconfig(): string {
  return `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@vh5/tsconfig/web-app.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "#/*": ["./types/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "types/**/*.d.ts"]
}
`;
}

function generateTsconfigNode(): string {
  return `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@vh5/tsconfig/node.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
  },
  "include": ["vite.config.ts"]
}
`;
}

function generateEnvDts(): string {
  return `/// <reference types="vite/client" />\n`;
}

function generateEnv(name: string): string {
  return `# 应用标识（用于 Store namespace 隔离）
VITE_APP_NAMESPACE=vh5-web-${name}
VITE_APP_TITLE=Vue H5 Template

# Production defaults. Copy values into the matching local env file as needed.
VITE_NITRO_MOCK=false
VITE_PWA_ENABLED=false
VITE_IMAGE_OPTIMIZE=false
`;
}

function generateHomeView(): string {
  return `<template>
  <section style="padding: 20px; text-align: center;">
    <h2>Welcome</h2>
    <p>This is a new H5 app created by create-app CLI.</p>
  </section>
</template>
`;
}

function generateSimpleView(name: string): string {
  return `<template>
  <section style="padding: 20px;">
    <h3>${name}</h3>
  </section>
</template>
`;
}

export function defineCreateAppCommand(cli: CAC) {
  cli
    .command(
      'create-app',
      'Create a new H5 app with the specified UI framework',
    )
    .action(async () => {
      const ui = await select<string>({
        message: 'Select UI framework:',
        options: [
          { label: 'Varlet (Material Design)', value: 'varlet' },
          { label: 'Vant (WeChat style)', value: 'vant' },
          { label: 'NutUI (JD style)', value: 'nutui' },
        ],
      });

      if (isCancel(ui)) {
        cancel('Operation cancelled');
        process.exit(0);
      }

      const name = await text({
        message: 'App name (e.g. h5-my-app):',
        placeholder: `h5-${ui as string}`,
        validate(value) {
          if (!value) return 'Name is required';
          if (!/^[\w-]+$/.test(value))
            return 'Name should only contain letters, numbers, - and _';
        },
      });

      if (isCancel(name)) {
        cancel('Operation cancelled');
        process.exit(0);
      }

      const appName = name as string;
      const uiType = ui as UILibrary;
      const template = UI_TEMPLATES[uiType];
      const root = findMonorepoRoot();
      const appDir = resolve(root, 'apps', appName);

      if (existsSync(appDir)) {
        consola.error(
          colors.red(`App directory already exists: apps/${appName}`),
        );
        process.exit(1);
      }

      // Create directory structure
      const dirs = [
        '',
        'src',
        'src/views/home',
        'src/views/list',
        'src/views/mine',
        'src/views/login',
        'src/layout',
        'src/components',
        'src/api',
        'src/stores',
        'src/locales',
        'src/assets',
        'public',
        'types',
      ];

      for (const dir of dirs) {
        mkdirSync(resolve(appDir, dir), { recursive: true });
      }

      // Generate files
      const files: Record<string, string> = {
        'package.json': generatePackageJson(appName, template),
        'vite.config.ts': generateViteConfig(uiType, appName),
        'tsconfig.json': generateTsconfig(),
        'tsconfig.node.json': generateTsconfigNode(),
        'env.d.ts': generateEnvDts(),
        'index.html': generateIndexHtml(),
        '.env.example': generateEnv(appName),
        '.env.development': generateEnvDevelopment(appName, template.devPort),
        '.env.production': generateEnvProduction(appName),
        'src/main.ts': generateMainTs(),
        'src/bootstrap.ts': generateBootstrap(uiType, template),
        'src/App.vue': generateAppVue(),
        'src/router/index.ts': generateRouter(),
        'src/views/home/index.vue': generateHomeView(),
        'src/views/list/index.vue': generateSimpleView('List'),
        'src/views/mine/index.vue': generateSimpleView('Mine'),
        'src/views/login/index.vue': generateSimpleView('Login'),
      };

      for (const [filePath, content] of Object.entries(files)) {
        const fullPath = resolve(appDir, filePath);
        mkdirSync(resolve(fullPath, '..'), { recursive: true });
        writeFileSync(fullPath, content, 'utf8');
      }

      // Copy layout from the reference app
      const refApp = resolve(root, 'apps', `h5-${uiType}`);
      const refLayout = resolve(refApp, 'src/layout/index.vue');
      if (existsSync(refLayout)) {
        cpSync(refLayout, resolve(appDir, 'src/layout/index.vue'));
      }

      // Copy locales from the reference app
      const refLocales = resolve(refApp, 'src/locales');
      if (existsSync(refLocales)) {
        cpSync(refLocales, resolve(appDir, 'src/locales'), { recursive: true });
      }

      // Copy api from the reference app
      const refApi = resolve(refApp, 'src/api');
      if (existsSync(refApi)) {
        cpSync(refApi, resolve(appDir, 'src/api'), { recursive: true });
      }

      // Copy stores from the reference app (nutui uses src/store, others use src/stores)
      const refStoresPath = existsSync(resolve(refApp, 'src/stores'))
        ? resolve(refApp, 'src/stores')
        : resolve(refApp, 'src/store');
      if (existsSync(refStoresPath)) {
        cpSync(refStoresPath, resolve(appDir, 'src/stores'), {
          recursive: true,
        });
      }

      consola.success(colors.green(`\n✅ App created: apps/${appName}`));
      consola.info(`\nNext steps:`);
      consola.info(
        `  1. Run ${colors.cyan('pnpm install')} to install dependencies`,
      );
      consola.info(`  2. Add dev/build scripts to root package.json:`);
      consola.info(
        `     ${colors.cyan(`"dev:${appName}": "pnpm -F @vh5/${appName} run dev"`)}`,
      );
      consola.info(
        `     ${colors.cyan(`"build:${appName}": "pnpm run build --filter=@vh5/${appName}"`)}`,
      );
      consola.info(
        `  3. Run ${colors.cyan(`pnpm dev:${appName}`)} to start development\n`,
      );
    });
}
