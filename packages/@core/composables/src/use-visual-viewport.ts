import { onBeforeUnmount, onMounted, readonly, ref } from 'vue';

/** Tracks the visible viewport so fixed mobile composers follow the virtual keyboard. */
export function useVisualViewport() {
  const viewportHeight = ref<number>();
  const viewportOffsetTop = ref(0);

  function update() {
    viewportHeight.value = window.visualViewport?.height;
    viewportOffsetTop.value = window.visualViewport?.offsetTop ?? 0;
  }

  onMounted(() => {
    update();
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
  });
  onBeforeUnmount(() => {
    window.visualViewport?.removeEventListener('resize', update);
    window.visualViewport?.removeEventListener('scroll', update);
  });

  return {
    viewportHeight: readonly(viewportHeight),
    viewportOffsetTop: readonly(viewportOffsetTop),
  };
}
