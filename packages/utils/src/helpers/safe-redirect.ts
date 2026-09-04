/**
 * Accepts application-relative redirects only. This prevents login callbacks
 * from becoming an open redirect through values such as `//evil.example`.
 */
export function getSafeRedirect(
  value: unknown,
  fallback = '/home',
  origin = globalThis.location?.origin ?? 'https://app.local',
) {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (typeof candidate !== 'string' || !candidate.startsWith('/')) {
    return fallback;
  }
  if (candidate.startsWith('//') || candidate.includes('\\')) return fallback;

  try {
    const url = new URL(candidate, origin);
    if (url.origin !== origin) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
