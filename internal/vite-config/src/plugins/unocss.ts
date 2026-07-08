import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetWind4 from '@unocss/preset-wind4';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import UnoCSS from 'unocss/vite';

interface ViteUnoCSSPluginOptions {
  uiLibrary?: 'none' | 'nut' | 'vant' | 'varlet';
}

export async function viteUnoCSSPlugin(options: ViteUnoCSSPluginOptions) {
  const presets = [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
    presetIcons(),
  ];

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
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
  ];
}
