import { showStartupError } from '@vh5/mobile-ui/startup-error';
import { unmountGlobalLoading } from '@vh5/utils';

async function initApplication() {
  const mode = import.meta.env.MODE;
  const devNamespace = mode === 'development' ? 'dev' : mode;
  const env = import.meta.env.PROD ? 'prod' : devNamespace;
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  unmountGlobalLoading();
}

initApplication().catch((error: unknown) => {
  console.error('Failed to initialize the application:', error);
  showStartupError();
  unmountGlobalLoading();
});
