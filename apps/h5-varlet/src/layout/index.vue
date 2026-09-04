<script setup lang="ts">
import FloatingAiButton from '@vh5/mobile-ui/FloatingAiButton.vue';

import { useNetworkStatus, useVisualViewport } from '@vh5-core/composables';

import { t } from '@/locales';

const router = useRouter();
const route = useRoute();
const { isOnline } = useNetworkStatus();
const { viewportHeight } = useVisualViewport();
const shellStyle = computed(() => ({
  height: viewportHeight.value ? `${viewportHeight.value}px` : '100dvh',
  // In-flow tabs own their safe area; child pages must not reserve it again.
  '--page-safe-bottom': tabbarVisible.value
    ? '0px'
    : 'env(safe-area-inset-bottom)',
}));
const tabItem = [
  { icon: 'home', key: 'home', path: '/home' },
  { icon: 'format-list-checkbox', key: 'list', path: '/list' },
  { icon: 'account-circle-outline', key: 'mine', path: '/member' },
  { icon: 'information-outline', key: 'example', path: '/examples' },
];
const activeTab = ref(0);
const tabbarVisible = ref(true);
const contentRef = ref<HTMLElement>();
// Vue Router resets the window; this mobile shell scrolls its own content.
watch(
  () => route.fullPath,
  () => {
    if (contentRef.value) {
      contentRef.value.scrollTop = 0;
      contentRef.value.scrollLeft = 0;
    }
  },
  { flush: 'post' },
);
watch(
  () => route.path,
  (path) => {
    const index = tabItem.findIndex((item) => item.path === path);
    activeTab.value = Math.max(index, 0);
    tabbarVisible.value = index !== -1;
  },
  { immediate: true },
);
const tabSwitch = (item: (typeof tabItem)[number], index: number) => {
  router.push(item.path);
  activeTab.value = index;
};
const goBack = () => {
  if (globalThis.history.length > 1) router.go(-1);
  else router.replace('/home');
};
const navTitle = computed(() =>
  t(typeof route.meta.title === 'string' ? route.meta.title : 'app.home'),
);
</script>

<template>
  <div class="app-shell flex flex-col w-100dvw" :style="shellStyle">
    <var-app-bar
      :title="navTitle"
      color="var(--app-primary)"
      text-color="#fff"
      title-position="center"
    >
      <template v-if="!tabbarVisible" #left>
        <var-button text round @click="goBack">
          <var-icon name="chevron-left" :size="24" />
        </var-button>
      </template>
    </var-app-bar>
    <div v-if="!isOnline" class="offline-banner" role="status">
      {{ t('mobile.offlineBanner') }}
    </div>
    <div
      ref="contentRef"
      class="app-content flex-1 min-h-0 overflow-hidden overflow-y-auto"
    >
      <RouterView v-slot="{ Component }" v-if="route.meta.keepAlive">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </RouterView>
      <RouterView v-if="!route.meta.keepAlive" :key="route.path" />
    </div>
    <div v-if="tabbarVisible">
      <var-bottom-navigation
        safe-area
        :active="activeTab"
        @update:active="(v) => (activeTab = Number(v))"
      >
        <var-bottom-navigation-item
          v-for="(item, index) in tabItem"
          :key="item.key"
          :data-testid="`tab-${item.key === 'mine' ? 'member' : item.key === 'example' ? 'examples' : item.key}`"
          :label="t(`app.${item.key}`)"
          :icon="item.icon"
          @click="tabSwitch(item, index)"
        />
      </var-bottom-navigation>
    </div>
    <FloatingAiButton :with-tabs="tabbarVisible" />
  </div>
</template>

<style scoped>
.app-content {
  overscroll-behavior: contain;
}

.app-shell,
.app-content {
  background: var(--app-surface);
}

.app-shell {
  --color-primary: var(--app-primary);
  --color-primary-container: var(--app-primary-soft);
  --bottom-navigation-item-active-color: var(--app-primary);
  --bottom-navigation-item-variant-active-background-color: var(
    --app-primary-soft
  );

  position: relative;
}

.offline-banner {
  min-height: 34px;
  padding: 7px 12px;
  font-size: 12px;
  color: var(--app-primary-deep);
  text-align: center;
  background: var(--app-primary-soft);
}
</style>
