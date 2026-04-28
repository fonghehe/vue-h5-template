<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { t } from "@/locales";
import { loadLocaleMessages } from "@vh5/locales";
import type { SupportedLanguagesType } from "@vh5/locales";

const router = useRouter();
const userStore = useUserStore();
const getUserInfo = computed(() => {
  return userStore.getUserInfo?.realName || "";
});

const goLogin = () => {
  router.push("/login");
};

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
  <div class="avatar-wrap">
    <nut-avatar class="avatar" size="large">
      <img
        :src="
          userStore.getUserInfo?.avatar ||
          'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
        "
      />
    </nut-avatar>
    <div class="member-detail">
      <p class="nickname">
        <span v-if="getUserInfo">{{ getUserInfo }}</span>
        <nut-button v-else shape="square" size="small" type="default" @click="goLogin">
          {{ t("app.pleaseLogin") }}
        </nut-button>
      </p>
      <p class="info">{{ userStore.isLoggedIn ? t("app.welcomeBack") : t("app.pleaseLogin") }}</p>
    </div>
  </div>
  <nut-cell-group>
    <nut-cell :title="t('app.language')" is-link @click="showLangPicker = true" />
    <nut-cell :title="t('app.settings')" is-link />
    <nut-cell :title="t('app.about')" is-link />
  </nut-cell-group>
  <div v-if="userStore.isLoggedIn" class="logout-wrap">
    <nut-button block type="danger" @click="handleLogout">{{ t("app.logout") }}</nut-button>
  </div>

  <nut-action-sheet v-model:visible="showLangPicker" :title="t('app.language')">
    <div class="lang-list">
      <nut-cell
        v-for="lang in languages"
        :key="lang.value"
        :title="lang.text"
        @click="switchLanguage(lang.value as SupportedLanguagesType)"
      />
    </div>
  </nut-action-sheet>
</template>

<style lang="scss">
.avatar-wrap {
  display: flex;
  align-items: center;
  margin: 20px;

  .member-detail {
    margin-left: 20px;

    .nickname {
      font-size: 16px;
      font-weight: bold;

      .nut-button {
        margin-left: 5px;
      }
    }

    .info {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}

.logout-wrap {
  padding: 20px;
}

.lang-list {
  padding: 8px;
}
</style>
