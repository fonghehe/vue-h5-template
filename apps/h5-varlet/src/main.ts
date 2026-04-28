import { unmountGlobalLoading } from "@vh5/utils";

async function initApplication() {
  const env = import.meta.env.PROD ? "prod" : "dev";
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  const { bootstrap } = await import("./bootstrap");
  await bootstrap(namespace);

  unmountGlobalLoading();
}

initApplication();
