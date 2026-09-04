import type Sortable from 'sortablejs';
import type { SortableOptions } from 'sortablejs';

import { shallowRef } from 'vue';

export function useSortable(
  element: HTMLElement,
  options: SortableOptions = {},
) {
  const instance = shallowRef<Sortable>();

  async function initializeSortable() {
    instance.value?.destroy();
    const { default: Sortable } = await import('sortablejs');
    instance.value = Sortable.create(element, {
      animation: 300,
      delay: 400,
      delayOnTouchOnly: true,
      ...options,
    });
    return instance.value;
  }

  function destroy() {
    instance.value?.destroy();
    instance.value = undefined;
  }

  return { destroy, initializeSortable, instance };
}
