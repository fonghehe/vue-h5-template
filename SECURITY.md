# Security Policy

Please report vulnerabilities privately through GitHub Security Advisories. Do not open a public issue containing credentials, exploit details, or sensitive user data.

Supported security baseline:

- provider secrets remain on the backend;
- generated Markdown is sanitized before HTML rendering;
- redirects are application-relative;
- the production build does not include the Nitro mock server;
- service workers do not runtime-cache API responses;
- authentication failures are handled centrally;
- production JWT secrets are required and never use the development fallback;
- dynamic scripts are same-origin by default and cross-origin hosts require an explicit allowlist.
- API module endpoints must be relative, preventing bearer credentials from being forwarded to an arbitrary origin;
- `openWindow` accepts only HTTP(S) URLs and rejects executable schemes.

The template's encrypted local persistence is an obfuscation and integrity convenience, not an XSS security boundary. Applications with higher-risk sessions should prefer secure, SameSite, HttpOnly backend cookies and deploy a restrictive CSP.

Run `pnpm audit:prod` against the npm security advisory service before releases. Security-patched transitive versions are pinned in the workspace overrides because all three UI targets remain supported.
