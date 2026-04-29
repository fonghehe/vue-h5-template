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
  { text: "简体中文", value: "zh-CN" },
  { text: "繁體中文", value: "zh-TW" },
  { text: "English", value: "en-US" },
  { text: "日本語", value: "ja-JP" },
];

const switchLanguage = async (lang: SupportedLanguagesType) => {
  await loadLocaleMessages(lang);
  showLangPicker.value = false;
};
</script>

<template>
  <section class="p-4">
    <div v-if="userStore.isLoggedIn" class="flex items-center gap-3 mb-4">
      <var-image width="60" height="60" radius="50%" :src="userStore.getUserInfo?.avatar" />
      <div>
        <p class="font-600 text-16px">{{ userStore.getUserInfo?.realName }}</p>
        <p class="text-#999 text-13px mt-1">{{ t("app.welcomeBack") }}</p>
      </div>
    </div>
    <div v-else class="text-center py-10">
      <div class="opacity-60 mb-3">{{ t("app.notLoggedIn") }}</div>
      <var-button type="primary" size="small" @click="goLogin">
        {{ t("app.pleaseLogin") }}
      </var-button>
    </div>

    <var-cell :title="t('app.language')" @click="showLangPicker = true" />
    <var-cell :title="t('app.settings')" />
    <var-cell :title="t('app.about')" />

    <div v-if="userStore.isLoggedIn" class="py-5">
      <var-button block type="primary" @click="handleLogout">
        {{ t("app.logout") }}
      </var-button>
    </div>

    <var-popup v-model:show="showLangPicker" position="bottom">
      <div class="py-2 pb-4">
        <div class="px-4 py-3 font-600 text-16px text-center">{{ t("app.language") }}</div>
        <var-cell
          v-for="lang in languages"
          :key="lang.value"
          :title="lang.text"
          @click="switchLanguage(lang.value as SupportedLanguagesType)"
        />
      </div>
    </var-popup>
  </section>
</template>
