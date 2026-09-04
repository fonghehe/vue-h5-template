import { onBeforeUnmount, onMounted, readonly, ref } from 'vue';

/** Reactive browser connectivity state. Online does not guarantee API reachability. */
export function useNetworkStatus() {
  const isOnline = ref(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );

  function update() {
    isOnline.value = navigator.onLine;
  }

  onMounted(() => {
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('online', update);
    window.removeEventListener('offline', update);
  });

  return { isOnline: readonly(isOnline) };
}
