import type { CAC } from 'cac';

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';

import { colors, consola, findMonorepoRoot } from '@vh5/node-utils';

import { cancel, isCancel, select, text } from '@clack/prompts';

const templates = {
  varlet: { label: 'Varlet (Material Design)', port: 5782 },
  vant: { label: 'Vant (WeChat style)', port: 5781 },
  nutui: { label: 'NutUI (JD style)', port: 5780 },
  tdesign: { label: 'TDesign Mobile Vue', port: 5785 },
  ionic: { label: 'Ionic Vue', port: 5786 },
};

type UILibrary = keyof typeof templates;

function copyReferenceApp(
  root: string,
  appDir: string,
  appName: string,
  ui: UILibrary,
) {
  const source = resolve(root, 'apps', `h5-${ui}`);
  mkdirSync(appDir);

  try {
    for (const entry of [
      'index.html',
      'public',
      'src',
      'tsconfig.json',
      'tsconfig.node.json',
      'vite.config.ts',
    ]) {
      cpSync(resolve(source, entry), resolve(appDir, entry), {
        recursive: true,
      });
    }
    for (const entry of ['env.d.ts', 'types']) {
      const path = resolve(source, entry);
      if (existsSync(path)) {
        cpSync(path, resolve(appDir, entry), { recursive: true });
      }
    }

    const manifest = JSON.parse(
      readFileSync(resolve(source, 'package.json'), 'utf8'),
    ) as Record<string, unknown>;
    manifest.name = `@vh5/${appName}`;
    writeFileSync(
      resolve(appDir, 'package.json'),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    // Mode files survive a fresh checkout. Copy only shared template settings,
    // leaving the reference app's local .env and overrides behind.
    const identity = `VITE_APP_TITLE=${appName}\nVITE_APP_NAMESPACE=vh5-web-${appName}\n`;
    for (const entry of [
      '.env.analyze',
      '.env.development',
      '.env.example',
      '.env.production',
      '.env.services',
    ]) {
      const path = resolve(source, entry);
      const defaults = existsSync(path)
        ? readFileSync(path, 'utf8')
            .replaceAll(/^VITE_(?:APP_NAMESPACE|APP_TITLE)=.*\n?/gmu, '')
            .replaceAll(/^VITE_PORT=.*$/gmu, `VITE_PORT=${templates[ui].port}`)
        : '';
      writeFileSync(resolve(appDir, entry), identity + defaults);
    }
  } catch (error) {
    rmSync(appDir, { force: true, recursive: true });
    throw error;
  }
}

export function defineCreateAppCommand(cli: CAC) {
  cli
    .command(
      'create-app',
      'Create a new H5 app with the specified UI framework',
    )
    .action(async () => {
      const ui = await select<UILibrary>({
        message: 'Select UI framework:',
        options: (Object.keys(templates) as UILibrary[]).map((value) => ({
          label: templates[value].label,
          value,
        })),
      });
      if (isCancel(ui)) {
        cancel('Operation cancelled');
        return;
      }

      const appName = await text({
        message: 'App name (e.g. h5-my-app):',
        placeholder: `h5-${ui}`,
        validate(value) {
          if (!value) return 'Name is required';
          if (!/^[a-z\d][a-z\d_-]{0,208}$/u.test(value)) {
            return 'Use lowercase letters, numbers, hyphens and underscores, starting with a letter or number';
          }
        },
      });
      if (isCancel(appName)) {
        cancel('Operation cancelled');
        return;
      }

      const root = findMonorepoRoot();
      const appDir = resolve(root, 'apps', appName);
      if (existsSync(appDir)) {
        throw new Error(`App directory already exists: apps/${appName}`);
      }

      copyReferenceApp(root, appDir, appName, ui);
      consola.success(colors.green(`App created: apps/${appName}`));
      consola.info(`Run pnpm install, then pnpm -F @vh5/${appName} dev`);
    });
}
