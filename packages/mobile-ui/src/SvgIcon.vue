<script lang="ts">
import { onMounted } from 'vue';

const rawIcons = import.meta.glob<string>('./assets/icons/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw',
});

const iconNames = Object.keys(rawIcons).map(
  (path) =>
    path
      .split('/')
      .at(-1)
      ?.replace(/\.svg$/u, '') ?? '',
);

let spriteReady = false;

function installSprite() {
  if (spriteReady || typeof document === 'undefined') return;
  const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sprite.id = 'vh5-shared-svg-sprite';
  sprite.setAttribute('aria-hidden', 'true');
  sprite.style.display = 'none';

  for (const [path, raw] of Object.entries(rawIcons)) {
    const name = path
      .split('/')
      .at(-1)
      ?.replace(/\.svg$/u, '');
    if (!name) continue;
    const source = new DOMParser().parseFromString(
      raw,
      'image/svg+xml',
    ).documentElement;
    const symbol = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'symbol',
    );
    symbol.id = `vh5-shared-icon-${name}`;
    symbol.setAttribute(
      'viewBox',
      source.getAttribute('viewBox') ?? '0 0 24 24',
    );
    for (const child of [...source.childNodes])
      symbol.append(child.cloneNode(true));
    sprite.append(symbol);
  }
  document.body.prepend(sprite);
  spriteReady = true;
}

export { iconNames };
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    size?: number | string;
    title?: string;
  }>(),
  { size: '1em', title: undefined },
);

if (import.meta.env.DEV && !iconNames.includes(props.name)) {
  console.warn(`[SvgIcon] Unknown icon: ${props.name}`);
}

onMounted(installSprite);
</script>

<template>
  <svg
    class="svg-icon"
    :style="{
      height: typeof size === 'number' ? `${size}px` : size,
      width: typeof size === 'number' ? `${size}px` : size,
    }"
    :aria-hidden="!title"
    :aria-label="title"
    role="img"
  >
    <title v-if="title">{{ title }}</title>
    <use :href="`#vh5-shared-icon-${name}`" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  flex: none;
  overflow: hidden;
  vertical-align: -0.15em;
  color: inherit;
  fill: currentcolor;
}
</style>
