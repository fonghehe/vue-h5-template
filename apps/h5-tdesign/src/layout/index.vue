<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

import { $t as t } from '@vh5/locales';
import FloatingAiButton from '@vh5/mobile-ui/FloatingAiButton.vue';

import { useNetworkStatus, useVisualViewport } from '@vh5-core/composables';

import {
  AppIcon,
  HomeIcon,
  UserCircleIcon,
  ViewListIcon,
} from 'tdesign-icons-vue-next';
import {
  Navbar as TNavbar,
  TabBar as TTabBar,
  TabBarItem as TTabBarItem,
} from 'tdesign-mobile-vue';

const router = useRouter();
const route = useRoute();
const { isOnline } = useNetworkStatus();
const { viewportHeight } = useVisualViewport();
const content = ref<HTMLElement>();
const tabs = [
  { icon: HomeIcon, key: 'home', name: 'home', path: '/home' },
  { icon: ViewListIcon, key: 'list', name: 'list', path: '/list' },
  { icon: UserCircleIcon, key: 'member', name: 'mine', path: '/member' },
  { icon: AppIcon, key: 'examples', name: 'example', path: '/examples' },
];
const activeTab = computed(() => tabs.find((tab) => tab.path === route.path));
const shellStyle = computed(() => ({
  height: viewportHeight.value ? `${viewportHeight.value}px` : '100dvh',
  '--page-safe-bottom': activeTab.value ? '0px' : 'env(safe-area-inset-bottom)',
}));
const title = computed(() =>
  t(typeof route.meta.title === 'string' ? route.meta.title : 'app.home'),
);

watch(
  () => route.fullPath,
  () => content.value?.scrollTo(0, 0),
  { flush: 'post' },
);

function goBack() {
  if (router.options.history.state.back) router.back();
  else void router.replace('/home');
}
</script>

<template>
  <div class="app-shell" :style="shellStyle">
    <TNavbar
      :title="title"
      :fixed="false"
      :left-arrow="false"
      safe-area-inset-top
    >
      <template v-if="!activeTab" #left>
        <button
          class="header-back"
          type="button"
          :aria-label="t('common.back')"
          @click="goBack"
        >
          <span aria-hidden="true">‹</span>
        </button>
      </template>
    </TNavbar>

    <div v-if="!isOnline" class="offline-banner" role="status">
      {{ t('mobile.offlineBanner') }}
    </div>
    <div ref="content" class="app-content">
      <RouterView :key="route.path" />
    </div>

    <TTabBar
      v-if="activeTab"
      :value="activeTab.path"
      :fixed="false"
      safe-area-inset-bottom
      @change="(path) => router.push(String(path))"
    >
      <TTabBarItem
        v-for="tab in tabs"
        :key="tab.key"
        :value="tab.path"
        :data-testid="`tab-${tab.key}`"
        :aria-label="t(`app.${tab.name}`)"
        class="tab-control"
        tabindex="0"
        @keydown.enter.prevent="router.push(tab.path)"
        @keydown.space.prevent="router.push(tab.path)"
      >
        <template #icon>
          <component :is="tab.icon" aria-hidden="true" />
        </template>
        {{ t(`app.${tab.name}`) }}
      </TTabBarItem>
    </TTabBar>
    <FloatingAiButton :with-tabs="Boolean(activeTab)" />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--app-surface);
}

.app-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
}

.offline-banner {
  padding: 7px 12px;
  font-size: 12px;
  color: var(--app-primary-deep);
  text-align: center;
  background: var(--app-primary-soft);
}

.header-back,
.tab-control {
  min-width: 44px;
  min-height: 44px;
}

.header-back:focus-visible,
.tab-control:focus-visible {
  outline: 2px solid var(--app-primary);
  outline-offset: -3px;
}

.header-back {
  display: grid;
  place-items: center;
  font-size: 26px;
  color: var(--app-primary);
  background: transparent;
  border: 0;
}
</style>
