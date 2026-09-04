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
}));
const tabItem = [
  { icon: 'home-o', key: 'home', path: '/home' },
  { icon: 'todo-list-o', key: 'list', path: '/list' },
  { icon: 'user-o', key: 'mine', path: '/member' },
  { icon: 'apps-o', key: 'example', path: '/examples' },
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
    <van-nav-bar
      :title="navTitle"
      :left-arrow="!tabbarVisible"
      safe-area-inset-top
      @click-left="goBack"
    />
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
    <van-tabbar v-model="activeTab" v-show="tabbarVisible" :fixed="false">
      <van-tabbar-item
        v-for="(item, index) in tabItem"
        :key="item.key"
        :data-testid="`tab-${item.key === 'mine' ? 'member' : item.key === 'example' ? 'examples' : item.key}`"
        :icon="item.icon"
        @click="tabSwitch(item, index)"
      >
        {{ t(`app.${item.key}`) }}
      </van-tabbar-item>
    </van-tabbar>

    <FloatingAiButton :with-tabs="tabbarVisible" />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
}

.app-content {
  overscroll-behavior: contain;
}

.van-nav-bar {
  margin-bottom: 0;
}

.app-shell,
.app-content {
  background: var(--app-surface);
}

.offline-banner {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 6px 12px;
  font-size: 12px;
  color: #7f451c;
  text-align: center;
  background: #fff3df;
}

.offline-banner a {
  font-weight: 600;
  color: inherit;
}
</style>
