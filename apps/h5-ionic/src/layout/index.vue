<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

import { $t as t } from '@vh5/locales';
import FloatingAiButton from '@vh5/mobile-ui/FloatingAiButton.vue';

import { useNetworkStatus, useVisualViewport } from '@vh5-core/composables';

import {
  IonButton,
  IonButtons,
  IonFooter,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import {
  chevronBackOutline,
  gridOutline,
  homeOutline,
  listOutline,
  personCircleOutline,
} from 'ionicons/icons';

const router = useRouter();
const route = useRoute();
const { isOnline } = useNetworkStatus();
const { viewportHeight } = useVisualViewport();
const content = ref<HTMLElement>();
const tabs = [
  { icon: homeOutline, key: 'home', name: 'home', path: '/home' },
  { icon: listOutline, key: 'list', name: 'list', path: '/list' },
  { icon: personCircleOutline, key: 'member', name: 'mine', path: '/member' },
  { icon: gridOutline, key: 'examples', name: 'example', path: '/examples' },
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
    <IonHeader>
      <!-- eslint-disable vue/no-deprecated-slot-attribute -- Ionic uses native Web Component slots. -->
      <IonToolbar>
        <div class="toolbar-row">
          <IonButtons v-if="!activeTab">
            <IonButton
              class="header-back"
              :aria-label="t('common.back')"
              @click="goBack"
            >
              <IonIcon
                :icon="chevronBackOutline"
                slot="icon-only"
                aria-hidden="true"
              />
            </IonButton>
          </IonButtons>
          <IonTitle class="toolbar-title">{{ title }}</IonTitle>
        </div>
      </IonToolbar>
      <!-- eslint-enable vue/no-deprecated-slot-attribute -->
    </IonHeader>

    <div v-if="!isOnline" class="offline-banner" role="status">
      {{ t('mobile.offlineBanner') }}
    </div>
    <div ref="content" class="app-content">
      <RouterView :key="route.path" />
    </div>

    <IonFooter v-if="activeTab">
      <nav class="tab-strip">
        <IonButton
          v-for="tab in tabs"
          :key="tab.key"
          fill="clear"
          :aria-current="activeTab.path === tab.path ? 'page' : undefined"
          :data-testid="`tab-${tab.key}`"
          class="tab-control"
          :class="{ 'is-active': activeTab.path === tab.path }"
          @click="router.push(tab.path)"
        >
          <span class="tab-label">
            <IonIcon :icon="tab.icon" aria-hidden="true" />
            {{ t(`app.${tab.name}`) }}
          </span>
        </IonButton>
      </nav>
    </IonFooter>
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
.tab-control:focus-visible,
.header-back::part(native):focus-visible,
.tab-control::part(native):focus-visible {
  outline: 2px solid var(--app-primary);
  outline-offset: -3px;
}

.header-back {
  height: 44px;
}

ion-toolbar {
  --background: var(--app-surface-raised);
}

.toolbar-row {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) 52px;
  align-items: center;
}

.toolbar-title {
  position: static;
  grid-area: 1 / 2;
  width: auto;
  height: auto;
  padding: 0;
  text-align: center;
}

.tab-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left);
  background: var(--app-surface-raised);
  border-top: 1px solid var(--app-border);
}

.tab-control {
  --padding-start: 0;
  --padding-end: 0;
  --color: var(--app-text-muted);

  min-height: 54px;
  margin: 0;
  font-size: 11px;
  text-transform: none;
  letter-spacing: normal;
}

.tab-control.is-active {
  --color: var(--app-primary);
}

.tab-label {
  display: grid;
  gap: 3px;
  justify-items: center;
}

.tab-label ion-icon {
  font-size: 20px;
}
</style>
