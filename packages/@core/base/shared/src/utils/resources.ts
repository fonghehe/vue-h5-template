interface LoadScriptOptions {
  /**
   * Origins that may host the script. Same-origin scripts are allowed by
   * default; cross-origin scripts must be explicitly allowlisted.
   */
  allowedOrigins?: readonly string[];
}

const pendingScriptLoads = new Map<string, Promise<void>>();

/**
 * Load a trusted JavaScript resource.
 *
 * Never pass user-controlled URLs. Cross-origin hosts must be explicitly
 * allowlisted so a compromised API response cannot become a script sink.
 */
function loadScript(src: string, options: LoadScriptOptions = {}) {
  const sourceUrl = new URL(src, document.baseURI);
  if (!['http:', 'https:'].includes(sourceUrl.protocol)) {
    return Promise.reject(new Error('Only HTTP(S) scripts can be loaded'));
  }
  const allowedOrigins = new Set([
    globalThis.location.origin,
    ...(options.allowedOrigins ?? []),
  ]);
  if (!allowedOrigins.has(sourceUrl.origin)) {
    return Promise.reject(
      new Error(`Script origin is not allowed: ${sourceUrl.origin}`),
    );
  }

  const existingScript = [...document.scripts].find(
    (script) => script.src === sourceUrl.href,
  );
  if (existingScript) {
    return pendingScriptLoads.get(sourceUrl.href) ?? Promise.resolve();
  }

  const script = document.createElement('script');
  script.src = sourceUrl.href;
  const loadPromise = new Promise<void>((resolve, reject) => {
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener(
      'error',
      () => {
        script.remove();
        reject(new Error(`Failed to load script: ${src}`));
      },
      { once: true },
    );
  });
  pendingScriptLoads.set(sourceUrl.href, loadPromise);
  document.head.append(script);

  return loadPromise.finally(() => {
    pendingScriptLoads.delete(sourceUrl.href);
  });
}

export { loadScript, type LoadScriptOptions };
