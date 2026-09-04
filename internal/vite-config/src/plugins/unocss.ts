import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import UnoCSS from 'unocss/vite';

interface ViteUnoCSSPluginOptions {
  uiLibrary?: 'none' | 'nut' | 'vant' | 'varlet';
}

export async function viteUnoCSSPlugin(options: ViteUnoCSSPluginOptions) {
  const presets = [presetUno(), presetAttributify(), presetIcons()];

  switch (options.uiLibrary) {
    case 'varlet': {
      const { presetVarlet } = await import('@varlet/preset-unocss');
      presets.push(presetVarlet());
      break;
    }

    // case "vant":
    //   presets.push(...)
    //   break;
  }

  return [
    UnoCSS({
      presets,
      rules: [
        ['safe-area-pt', { paddingTop: 'env(safe-area-inset-top)' }],
        ['safe-area-pb', { paddingBottom: 'env(safe-area-inset-bottom)' }],
        [
          'safe-area-px',
          {
            paddingLeft: 'env(safe-area-inset-left)',
            paddingRight: 'env(safe-area-inset-right)',
          },
        ],
        ['h-safe-screen', { height: '100dvh', minHeight: '100vh' }],
      ],
      shortcuts: {
        'mobile-card':
          'rounded-4 bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.06)]',
        'page-shell': 'mx-auto min-h-full w-full max-w-600px bg-#f6f7fb',
        'tap-target': 'min-h-44px min-w-44px touch-manipulation',
      },
      theme: {
        colors: {
          brand: {
            50: 'var(--app-primary-soft)',
            100: 'var(--app-primary-soft)',
            500: 'var(--app-primary)',
            600: 'var(--app-primary-deep)',
            700: 'var(--app-primary-deep)',
          },
          surface: 'var(--app-surface)',
        },
        breakpoints: {
          sm: '375px',
          md: '600px',
          lg: '768px',
        },
      },
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
  ];
}
