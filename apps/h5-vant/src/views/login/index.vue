<script setup lang="ts">
import { getErrorMessage } from '@vh5/api-client';
import { getSafeRedirect } from '@vh5/utils';

import LoginForm from '@/components/auth/LoginForm.vue';
import { t } from '@/locales';
import router from '@/router';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const loginHintKey =
  import.meta.env.VITE_NITRO_MOCK === 'true'
    ? 'app.mockLoginHint'
    : 'app.serviceLoginHint';
const userStore = useUserStore();
const loading = ref(false);

async function submit(credentials: { password: string; username: string }) {
  loading.value = true;
  try {
    await userStore.login(credentials.username, credentials.password);
    showToast(t('app.loginSuccess'));
    await router.replace(getSafeRedirect(route.query.redirect, '/member'));
  } catch (error: unknown) {
    showToast(getErrorMessage(error, t('app.loginFailed')));
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="login-page">
    <div class="login-card mobile-card">
      <span class="eyebrow">WELCOME BACK</span>
      <h1>{{ t('app.login') }}</h1>
      <p>{{ t(loginHintKey) }}</p>
      <LoginForm :loading="loading" @submit="submit" />
    </div>
  </section>
</template>

<style scoped>
.login-page {
  min-height: 100%;
  padding: 42px 18px;
  background:
    radial-gradient(
      circle at 85% 3%,
      rgb(var(--app-primary-rgb) / 16%),
      transparent 30%
    ),
    var(--app-surface);
}

.login-card {
  padding: 24px;
}

.eyebrow {
  font-size: 10px;
  font-weight: 700;
  color: var(--app-primary);
  letter-spacing: 1.5px;
}

h1 {
  margin: 8px 0 6px;
  font-size: 23px;
}

p {
  margin: 0 0 22px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--app-text-muted);
}
</style>
