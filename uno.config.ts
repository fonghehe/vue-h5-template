import { defineConfig, presetAttributify, presetTypography, presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetRemToPx from "@unocss/preset-rem-to-px";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx({
      // default
      baseFontSize: 16,
    }),
    presetIcons({
      // cdn: 'https://esm.sh/',
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),

    presetAttributify(),

    presetTypography(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],

  // 一些实用的自定义组合
  shortcuts: {
    "m-0-auto": "m-0 ma", // margin: 0 auto
    "wh-full": "w-full h-full", // width: 100%, height: 100%
    "flex-center": "flex justify-center items-center", // flex布局居中
    "flex-x-center": "flex justify-center", // flex布局：主轴居中
    "flex-y-center": "flex items-center", // flex布局：交叉轴居中
    "text-overflow": "overflow-hidden whitespace-nowrap text-ellipsis", // 文本溢出显示省略号
    "text-break": "whitespace-normal break-all break-words", // 文本溢出换行
  },
  safelist: ["i-ph:house", "i-ph:chart-line", "i-ph:code", "i-ph:user"],
});
