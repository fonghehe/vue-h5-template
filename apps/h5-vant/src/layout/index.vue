<script setup lang="ts">
import { t } from "@/locales";

const router = useRouter();
const route = useRoute();
const tabItem = [
  { key: "home", icon: "home-o" },
  { key: "list", icon: "todo-list-o" },
  { key: "mine", icon: "user-o" },
  { key: "example", icon: "apps-o" },
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
  <div class="flex flex-col w-100dvw h-100dvh">
    <van-nav-bar
      :title="navTitle"
      :left-arrow="!tabbarVisible"
      safe-area-inset-top
      @click-left="goBack"
    />
    <div class="flex-1 min-h-0 overflow-hidden overflow-y-auto" :class="{ 'px-15px': showBorder }">
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
        :icon="item.icon"
        @click="tabSwitch(item, index)"
      >
        {{ t(`app.${item.key}`) }}
      </van-tabbar-item>
    </van-tabbar>
    <van-back-top right="16" bottom="80" />
  </div>
</template>

<style scoped>
.van-nav-bar {
  margin-bottom: 0;
}
</style>
