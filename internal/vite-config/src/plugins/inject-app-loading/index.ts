import type { PluginOption } from 'vite';

import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { readPackageJSON } from '@vh5/node-utils';

/**
 * 用于生成将loading样式注入到项目中
 * 为多app提供loading样式，无需在每个 app -> index.html单独引入
 */
async function viteInjectAppLoadingPlugin(
  isBuild: boolean,
  env: Record<string, string> = {},
  loadingTemplate = 'loading.html',
): Promise<PluginOption | undefined> {
  let loadingHtml: string | undefined;
  let packageVersion = '0.0.0';

  try {
    loadingHtml = await getLoadingRawByHtmlTemplate(loadingTemplate);
    const packageData = await readPackageJSON(process.cwd());
    packageVersion = packageData.version || '0.0.0';
  } catch (error) {
    console.log(error)
    console.warn('Failed to load loading template or package.json:', error);
    return undefined;
  }

  const envRaw = isBuild ? 'prod' : 'dev';
  // 转义环境变量以防止XSS攻击
  const namespace = (env.VITE_APP_NAMESPACE || 'app').replace(/[^a-zA-Z0-9-_]/g, '');
  const cacheName = `'${namespace}-${packageVersion}-${envRaw}-preferences-theme'`;

  // 获取缓存的主题
  // 保证黑暗主题下，刷新页面时，loading也是黑暗主题
  const injectScript = `
  <script data-app-loading="inject-js">
  var theme = localStorage.getItem(${cacheName});
  document.documentElement.classList.toggle('dark', /dark/.test(theme));
</script>
`;

  if (!loadingHtml) {
    return undefined;
  }

  return {
    enforce: 'pre',
    name: 'vite:inject-app-loading',
    transformIndexHtml: {
      handler(html: string) {
        // 改进正则表达式，支持匹配带有属性的body标签
        const bodyMatch = html.match(/<body[^>]*>/i);
        if (bodyMatch) {
          const bodyTag = bodyMatch[0];
          const replacement = `${bodyTag}${injectScript}${loadingHtml}`;
          html = html.replace(bodyTag, replacement);
        }
        return html;
      },
      order: 'pre',
    },
  };
}

/**
 * 用于获取loading的html模板
 */
async function getLoadingRawByHtmlTemplate(loadingTemplate: string): Promise<string | undefined> {
  // 支持在app内自定义loading模板，模版参考default-loading.html即可
  let appLoadingPath = join(process.cwd(), loadingTemplate);

  if (!fs.existsSync(appLoadingPath)) {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    appLoadingPath = join(__dirname, './default-loading.html');
  }

  try {
    return await fsp.readFile(appLoadingPath, 'utf8');
  } catch (error) {
    console.warn(`Failed to read loading template from ${appLoadingPath}:`, error);
    return undefined;
  }
}

export { viteInjectAppLoadingPlugin };
