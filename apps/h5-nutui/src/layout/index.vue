<script lang="ts" setup name="BasicLayoutPage">
import { t } from "@/locales";
import { Home, Horizontal, Location, My } from "@nutui/icons-vue";

const tabItem = [
  { key: "home", icon: Home, label: () => t("app.home") },
  { key: "list", icon: Horizontal, label: () => t("app.list") },
  { key: "mine", icon: My, label: () => t("app.mine") },
  { key: "example", icon: Location, label: () => t("app.example") },
];

const route = useRoute();
const router = useRouter();
const activeTab = ref(0);

const tabbarVisible = ref(true);

const showBorder = ref(true);

const navTitle = computed(() => (route.meta.title as string) || "默认标题");

watch(
  () => router,
  () => {
    const judgeRoute = tabItem.some(
      (item) => item.key === router.currentRoute.value.path.replace("/", ""),
    );
    activeTab.value = tabItem.findIndex(
      (item) => item.key === router.currentRoute.value.path.replace("/", ""),
    );
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
</script>

<template>
  <div class="flex flex-col w-100dvw h-100dvh">
    <nut-navbar :title="navTitle" :left-show="!tabbarVisible" @click-back="goBack" />

    <div class="flex-1 min-h-0 overflow-hidden overflow-y-auto" :class="{ 'px-15px': showBorder }">
      <RouterView v-slot="{ Component }" v-if="route.meta.keepAlive">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </RouterView>
      <RouterView v-if="!route.meta.keepAlive" :key="route.path" />
    </div>

    <nut-tabbar
      unactive-color="#364636"
      active-color="#1989fa"
      v-model="activeTab"
      v-show="tabbarVisible"
      @tab-switch="tabSwitch"
    >
      <nut-tabbar-item
        v-for="item in tabItem"
        :key="item.key"
        :tab-title="item.label()"
        :icon="item.icon"
      />
    </nut-tabbar>
  </div>
</template>

<style scoped>
.nut-navbar {
  margin-bottom: 0;
}
</style>
