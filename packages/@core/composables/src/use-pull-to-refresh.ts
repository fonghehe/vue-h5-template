import { computed, readonly, ref } from 'vue';

interface PullToRefreshOptions {
  maxDistance?: number;
  onRefresh: () => Promise<unknown>;
  threshold?: number;
}

function nearestScrollTop(target: EventTarget | null): number {
  let element = target instanceof HTMLElement ? target : null;
  while (element) {
    if (element.scrollHeight > element.clientHeight) return element.scrollTop;
    element = element.parentElement;
  }
  return window.scrollY;
}

/** Touch-only pull-to-refresh state machine for a contained mobile page. */
export function usePullToRefresh({
  maxDistance = 88,
  onRefresh,
  threshold = 64,
}: PullToRefreshOptions) {
  const startY = ref<number>();
  const distance = ref(0);
  const refreshing = ref(false);
  const ready = computed(() => distance.value >= threshold);

  function reset() {
    startY.value = undefined;
    distance.value = 0;
  }

  function onTouchStart(event: TouchEvent) {
    if (refreshing.value || nearestScrollTop(event.currentTarget) > 0) return;
    startY.value = event.touches[0]?.clientY;
  }

  function onTouchMove(event: TouchEvent) {
    if (
      startY.value === undefined ||
      refreshing.value ||
      nearestScrollTop(event.currentTarget) > 0
    ) {
      return;
    }
    const currentY = event.touches[0]?.clientY ?? startY.value;
    distance.value = Math.min(
      maxDistance,
      Math.max(0, (currentY - startY.value) * 0.45),
    );
  }

  async function onTouchEnd() {
    if (startY.value === undefined) return;
    if (!ready.value) {
      reset();
      return;
    }
    refreshing.value = true;
    distance.value = threshold;
    try {
      await onRefresh();
    } finally {
      refreshing.value = false;
      reset();
    }
  }

  return {
    distance: readonly(distance),
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    ready,
    refreshing: readonly(refreshing),
  };
}
