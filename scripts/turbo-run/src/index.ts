import { consola } from '@vh5/node-utils';

import { cac } from 'cac';

import { run } from './run';

try {
  const turboRun = cac('turbo-run');

  turboRun
    .command('[script]')
    .usage(`Run turbo interactively.`)
    .action((command: string) => run({ command }));

  turboRun.usage('turbo-run');
  turboRun.help();
  turboRun.parse(undefined, { run: false });
  await turboRun.runMatchedCommand();
} catch (error) {
  consola.error(error);
  process.exit(1);
}
