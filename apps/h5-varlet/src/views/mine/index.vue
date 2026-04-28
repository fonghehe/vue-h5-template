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
  <section class="mine-page">
    <div v-if="userStore.isLoggedIn" class="avatar-wrap">
      <var-image width="60" height="60" radius="50%" :src="userStore.getUserInfo?.avatar" />
      <div class="member-detail">
        <p class="nickname">{{ userStore.getUserInfo?.realName }}</p>
        <p class="info">{{ t("app.welcomeBack") }}</p>
      </div>
    </div>
    <div v-else class="not-logged-in">
      <div class="not-logged-in-text">{{ t("app.notLoggedIn") }}</div>
      <var-button type="primary" size="small" @click="goLogin">
        {{ t("app.pleaseLogin") }}
      </var-button>
    </div>

    <var-cell :title="t('app.language')" @click="showLangPicker = true" />
    <var-cell :title="t('app.settings')" />
    <var-cell :title="t('app.about')" />

    <div v-if="userStore.isLoggedIn" class="logout-wrap">
      <var-button block type="primary" @click="handleLogout">
        {{ t("app.logout") }}
      </var-button>
    </div>

    <var-popup v-model:show="showLangPicker" position="bottom">
      <div class="lang-picker">
        <div class="lang-picker-title">{{ t("app.language") }}</div>
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

<style scoped>
.mine-page {
  padding: 16px;
}

.avatar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.member-detail .nickname {
  font-weight: 600;
  font-size: 16px;
}

.member-detail .info {
  color: #999;
  font-size: 13px;
  margin-top: 4px;
}

.not-logged-in {
  text-align: center;
  padding: 40px 0;
}

.not-logged-in-text {
  opacity: 0.6;
  margin-bottom: 12px;
}

.logout-wrap {
  padding: 20px 0;
}

.lang-picker {
  padding: 8px 0 16px;
}

.lang-picker-title {
  padding: 12px 16px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
}
</style>
