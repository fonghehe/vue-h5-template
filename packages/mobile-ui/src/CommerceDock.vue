<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({ inheritAttrs: false });
const dock = ref<HTMLElement>();
const height = ref(0);
let observer: ResizeObserver | undefined;

onMounted(() => {
  const element = dock.value;
  if (!element) return;
  const measure = () => {
    height.value = Math.ceil(element.getBoundingClientRect().height);
  };
  measure();
  observer = new ResizeObserver(measure);
  observer.observe(element, { box: 'border-box' });
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <!-- Reserve only the actual fixed bar height, including its safe area. -->
  <div
    class="commerce-dock-space"
    :style="{ height: `${height}px` }"
    aria-hidden="true"
  ></div>
  <footer ref="dock" class="commerce-dock" v-bind="$attrs">
    <slot></slot>
  </footer>
</template>
