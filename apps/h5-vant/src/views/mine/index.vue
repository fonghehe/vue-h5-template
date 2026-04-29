<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { t } from "@/locales";
import { loadLocaleMessages } from "@vh5/locales";
import type { SupportedLanguagesType } from "@vh5/locales";

const router = useRouter();
const userStore = useUserStore();

const goLogin = () => router.push("/login");
const handleLogout = async () => {
  await userStore.logout();
  router.push("/login");
};

const showLangPicker = ref(false);
const languages = [
  { name: "简体中文", value: "zh-CN" },
  { name: "繁體中文", value: "zh-TW" },
  { name: "English", value: "en-US" },
  { name: "日本語", value: "ja-JP" },
];

const onSelectLang = async (item: { name: string; value: string }) => {
  await loadLocaleMessages(item.value as SupportedLanguagesType);
  showLangPicker.value = false;
};
</script>

<template>
  <section class="p-4">
    <div v-if="userStore.isLoggedIn" class="flex items-center gap-3 mb-4">
      <van-image round width="60" height="60" :src="userStore.getUserInfo?.avatar" />
      <div>
        <p class="font-600 text-16px">{{ userStore.getUserInfo?.realName }}</p>
        <p class="text-#999 text-13px mt-1">{{ t("app.welcomeBack") }}</p>
      </div>
    </div>
    <van-empty v-else :description="t('app.notLoggedIn')">
      <van-button type="primary" size="small" @click="goLogin">
        {{ t("app.pleaseLogin") }}
      </van-button>
    </van-empty>

    <van-cell-group inset class="mt-4">
      <van-cell :title="t('app.language')" icon="flag-o" is-link @click="showLangPicker = true" />
      <van-cell :title="t('app.settings')" icon="setting-o" is-link />
      <van-cell :title="t('app.about')" icon="info-o" is-link />
    </van-cell-group>

    <div v-if="userStore.isLoggedIn" class="py-5">
      <van-button block type="primary" @click="handleLogout">
        {{ t("app.logout") }}
      </van-button>
    </div>

    <van-action-sheet
      v-model:show="showLangPicker"
      :title="t('app.language')"
      :actions="languages"
      @select="onSelectLang"
    />
  </section>
</template>
