/** Update or append CSS custom properties in a dedicated style element. */
export function updateCSSVariables(
  variables: Record<string, string>,
  styleElementId: string,
) {
  const styleElement = document.querySelector(`#${styleElementId}`);
  if (!(styleElement instanceof HTMLStyleElement)) return;

  let content = styleElement.textContent ?? ':root {}';
  for (const [name, value] of Object.entries(variables)) {
    const property = name.startsWith('--') ? name : `--${name}`;
    const escaped = property.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    const declaration = new RegExp(`${escaped}\\s*:\\s*[^;}]+;?`, 'u');
    if (declaration.test(content)) {
      content = content.replace(declaration, `${property}: ${value};`);
    } else if (/:root\s*\{/u.test(content)) {
      content = content.replace(
        /:root\s*\{/u,
        `:root { ${property}: ${value};`,
      );
    } else {
      content += `\n:root { ${property}: ${value}; }`;
    }
  }
  styleElement.textContent = content;
}
