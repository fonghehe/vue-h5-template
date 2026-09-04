<script lang="ts" setup name="BasicLayoutPage">
import FloatingAiButton from '@vh5/mobile-ui/FloatingAiButton.vue';

import { useNetworkStatus, useVisualViewport } from '@vh5-core/composables';

import { Home, Horizontal, Left, Location, My } from '@nutui/icons-vue';

import { t } from '@/locales';

const tabItem = [
  { icon: Home, key: 'home', label: () => t('app.home'), path: '/home' },
  {
    icon: Horizontal,
    key: 'list',
    label: () => t('app.list'),
    path: '/list',
  },
  {
    icon: My,
    key: 'member',
    label: () => t('app.mine'),
    path: '/member',
  },
  {
    icon: Location,
    key: 'examples',
    label: () => t('app.example'),
    path: '/examples',
  },
];

const route = useRoute();
const router = useRouter();
const { isOnline } = useNetworkStatus();
const { viewportHeight } = useVisualViewport();
const shellStyle = computed(() => ({
  height: viewportHeight.value ? `${viewportHeight.value}px` : '100dvh',
  // In-flow tabs own their safe area; child pages must not reserve it again.
  '--page-safe-bottom': tabbarVisible.value
    ? '0px'
    : 'env(safe-area-inset-bottom)',
}));
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
const navTitle = computed(() =>
  t(typeof route.meta.title === 'string' ? route.meta.title : 'app.home'),
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

const goBack = () => {
  if (globalThis.history.length > 1) router.go(-1);
  else router.replace('/home');
};
</script>

<template>
  <div class="app-shell flex flex-col w-100dvw" :style="shellStyle">
    <nut-navbar
      :title="navTitle"
      :left-show="!tabbarVisible"
      @click-back="goBack"
    >
      <template #left-show>
        <button
          class="header-back"
          :aria-label="t('common.back')"
          @click.stop="goBack"
        >
          <Left width="18px" height="18px" color="currentColor" />
        </button>
      </template>
    </nut-navbar>

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

    <nut-tabbar
      safe-area-inset-bottom
      v-model="activeTab"
      v-show="tabbarVisible"
      active-color="var(--app-primary)"
      unactive-color="var(--app-text-muted)"
    >
      <nut-tabbar-item
        v-for="item in tabItem"
        :key="item.key"
        :data-testid="`tab-${item.key}`"
        :tab-title="item.label()"
        :icon="item.icon"
        :to="item.path"
      />
    </nut-tabbar>
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

.nut-navbar {
  margin-bottom: 0;
}

.header-back {
  display: grid;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  color: var(--nut-navbar-color, #fff);
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 50%;
}

.header-back:focus-visible {
  outline: 2px solid currentcolor;
  outline-offset: -4px;
}

.app-shell,
.app-content {
  background: var(--app-surface);
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
