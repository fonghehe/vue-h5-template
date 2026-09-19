<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue';
import { RouterLink } from 'vue-router';

import { getProductFavorite, setProductFavorite } from '@vh5/api-client';
import { useI18n } from '@vh5/locales';

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
const props = defineProps<{ productId: number; session: string }>();
const { t } = useI18n();
const scope = useId();
const generation = ref(0);
const client = useQueryClient();
const key = computed(() => [
  'favorite',
  scope,
  generation.value,
  props.productId,
]);
const favorite = useQuery({
  queryKey: key,
  enabled: computed(
    () =>
      !!props.session &&
      Number.isSafeInteger(props.productId) &&
      props.productId > 0,
  ),
  queryFn: ({ signal }) => getProductFavorite(props.productId, signal),
  retry: false,
});
const mutation = useMutation({
  mutationFn: (input: {
    favorite: boolean;
    id: number;
    key: readonly unknown[];
  }) => setProductFavorite(input.id, input.favorite),
  onSuccess: (data, input) => {
    client.setQueryData(input.key, data);
  },
});
watch(
  () => props.session,
  () => {
    generation.value++;
    mutation.reset();
  },
  { flush: 'sync' },
);
watch(
  () => props.productId,
  () => mutation.reset(),
);
function toggle() {
  if (
    !favorite.data.value ||
    favorite.isFetching.value ||
    mutation.isPending.value
  )
    return;
  mutation.mutate({
    id: props.productId,
    favorite: !favorite.data.value.favorite,
    key: [...key.value],
  });
}
</script>
<template>
  <div class="favorite-control">
    <RouterLink v-if="!session" to="/login">
      {{ t('mobile.favoriteLogin') }}
    </RouterLink>
    <template v-else>
      <button
        v-if="favorite.isError.value"
        type="button"
        @click="favorite.refetch()"
      >
        {{ t('mobile.retry') }}
      </button>
      <button
        v-else
        type="button"
        :aria-pressed="favorite.data.value?.favorite ?? false"
        :disabled="
          !favorite.data.value ||
          favorite.isFetching.value ||
          mutation.isPending.value
        "
        @click="toggle"
      >
        {{
          t(
            favorite.data.value?.favorite
              ? 'mobile.unfavorite'
              : 'mobile.favorite',
          )
        }}
      </button>
      <p v-if="favorite.isError.value || mutation.isError.value" role="alert">
        {{ t('mobile.favoriteFailed') }}
      </p>
    </template>
  </div>
</template>
<style scoped>
.favorite-control {
  margin-block: 1rem;
}

.favorite-control button,
.favorite-control a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  color: inherit;
  background: transparent;
  border: 1px solid currentcolor;
  border-radius: 6px;
}

.favorite-control button:disabled {
  opacity: 0.5;
}

.favorite-control :focus-visible {
  outline: 2px solid currentcolor;
  outline-offset: 2px;
}
</style>
