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
  <section class="mine-page">
    <div v-if="userStore.isLoggedIn" class="avatar-wrap">
      <van-image round width="60" height="60" :src="userStore.getUserInfo?.avatar" />
      <div class="member-detail">
        <p class="nickname">{{ userStore.getUserInfo?.realName }}</p>
        <p class="info">{{ t("app.welcomeBack") }}</p>
      </div>
    </div>
    <van-empty v-else :description="t('app.notLoggedIn')">
      <van-button type="primary" size="small" @click="goLogin">
        {{ t("app.pleaseLogin") }}
      </van-button>
    </van-empty>

    <van-cell-group inset class="menu-group">
      <van-cell :title="t('app.language')" icon="flag-o" is-link @click="showLangPicker = true" />
      <van-cell :title="t('app.settings')" icon="setting-o" is-link />
      <van-cell :title="t('app.about')" icon="info-o" is-link />
    </van-cell-group>

    <div v-if="userStore.isLoggedIn" class="logout-wrap">
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

.menu-group {
  margin-top: 16px;
}

.logout-wrap {
  padding: 20px 0;
}
</style>
