import { execaCommand, getPackages, Package } from '@vh5/node-utils';

import { cancel, isCancel, select } from '@clack/prompts';

interface RunOptions {
  command?: string;
}

export async function run(options: RunOptions) {
  const { command } = options;
  if (!command) {
    console.error('Please enter the command to run');
    process.exit(1);
  }
  const { packages }:{ packages:Package[] } = await getPackages();

  // 只显示有对应命令的包
  const selectPkgs = packages.filter((pkg) => {
    return (pkg?.packageJson as Record<string, any>)?.scripts?.[command];
  });

  let selectPkg: string | symbol;
  if (selectPkgs.length > 1) {
    selectPkg = await select<string>({
      message: `Select the app you want to run [${command}]:`,
      options: selectPkgs.map((item) => ({
        label: item?.packageJson.name,
        value: item?.packageJson.name,
      })),
    });

    if (isCancel(selectPkg) || !selectPkg) {
      cancel('⚠️ Operation cancelled');
      process.exit(0);
    }
  } else {
    selectPkg = selectPkgs[0]?.packageJson?.name ?? '';
  }

  if (!selectPkg) {
    console.error('No app found');
    process.exit(1);
  }

  execaCommand(`pnpm --filter=${String(selectPkg)} run ${command}`, {
    stdio: 'inherit',
  });
}

