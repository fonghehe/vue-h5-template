<script setup lang="ts">
import { t } from "@/locales";

const router = useRouter();
const route = useRoute();
const tabItem = [
  { key: "home", icon: "home" },
  { key: "list", icon: "format-list-checkbox" },
  { key: "mine", icon: "account-circle-outline" },
  { key: "example", icon: "information-outline" },
];
const activeTab = ref(0);
const tabbarVisible = ref(true);
const showBorder = ref(true);
watch(
  () => router,
  () => {
    const path = router.currentRoute.value.path.replace("/", "");
    const judgeRoute = tabItem.some((item) => item.key === path);
    activeTab.value = tabItem.findIndex((item) => item.key === path);
    tabbarVisible.value = judgeRoute;
    showBorder.value = judgeRoute;
  },
  { deep: true, immediate: true },
);
const tabSwitch = (_item: any, index: number) => {
  switch (index) {
    case 0: {
      router.push("/home");
      break;
    }
    case 1: {
      router.push("/list");
      break;
    }
    case 2: {
      router.push("/mine");
      break;
    }
    case 3: {
      router.push("/example");
      break;
    }
  }
  activeTab.value = index;
};
const goBack = () => {
  router.go(-1);
};
const navTitle = computed(() => (router.currentRoute.value.meta?.title as string) || "首页");
</script>

<template>
  <div class="main-page">
    <var-app-bar :title="navTitle" title-position="center">
      <template v-if="!tabbarVisible" #left>
        <var-button text round @click="goBack">
          <var-icon name="chevron-left" :size="24" />
        </var-button>
      </template>
    </var-app-bar>
    <div class="main-box" :class="{ border: showBorder }">
      <RouterView v-slot="{ Component }" v-if="route.meta.keepAlive">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </RouterView>
      <RouterView v-if="!route.meta.keepAlive" :key="route.path" />
    </div>
    <var-bottom-navigation
      :active="activeTab"
      v-show="tabbarVisible"
      @update:active="(v) => (activeTab = Number(v))"
    >
      <var-bottom-navigation-item
        v-for="(item, index) in tabItem"
        :key="item.key"
        :label="t(`app.${item.key}`)"
        :icon="item.icon"
        @click="tabSwitch(item, index)"
      />
    </var-bottom-navigation>
  </div>
</template>

<style scoped lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  width: 100dvw;
  height: 100dvh;

  .main-box {
    flex: 1;
    min-height: 0;
    overflow: hidden auto;
  }
}

.border {
  padding-right: 15px;
  padding-left: 15px;
}
</style>
