<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useI18n } from '@vh5/locales';

import LanguageSelect from './LanguageSelect.vue';

import './surface.css';
const props = defineProps<{
  avatar?: string;
  loggedIn: boolean;
  logout: () => Promise<void>;
  name?: string;
}>();
const { t } = useI18n();
const busy = ref(false);
const failed = ref(false);
async function signOut() {
  busy.value = true;
  failed.value = false;
  try {
    await props.logout();
  } catch {
    failed.value = true;
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <section class="product-page">
    <div class="panel profile-panel">
      <span class="eyebrow">{{ t('app.mine') }}</span>
      <img v-if="loggedIn && avatar" class="avatar" :src="avatar" alt="" />
      <h1>{{ loggedIn ? name : t('mobile.guest') }}</h1>
      <p class="muted">
        {{ t(loggedIn ? 'app.welcomeBack' : 'app.notLoggedIn') }}
      </p>
      <RouterLink v-if="!loggedIn" class="action" to="/login">
        {{ t('app.pleaseLogin') }}
      </RouterLink>
    </div>
    <div class="panel"><LanguageSelect /></div>
    <div class="panel">
      <RouterLink class="row-link" to="/cart">
        <span>{{ t('mobile.cart') }}</span
        >›
      </RouterLink>
      <RouterLink class="row-link" to="/examples">
        <span>{{ t('app.example') }}</span
        >›
      </RouterLink>
      <RouterLink class="row-link" to="/examples/mobile">
        <span>{{ t('mobile.mobile') }}</span
        >›
      </RouterLink>
    </div>
    <button
      v-if="loggedIn"
      class="action secondary"
      :disabled="busy"
      @click="signOut"
    >
      {{ t('app.logout') }}
    </button>
    <p v-if="failed" role="alert">{{ t('mobile.failed') }}</p>
  </section>
</template>
<style scoped>
.profile-panel {
  background: linear-gradient(
    135deg,
    var(--app-surface-raised),
    var(--app-primary-soft)
  );
}

.avatar {
  display: block;
  width: 64px;
  height: 64px;
  margin-top: 18px;
  border-radius: 50%;
}
</style>
