<script setup lang="ts">
import { getErrorMessage } from '@vh5/api-client';
import { getSafeRedirect } from '@vh5/utils';

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
const formData = reactive({
  name: 'user',
  pwd: '123456',
});

async function submit() {
  if (loading.value) return;
  if (!formData.name || !formData.pwd) {
    Snackbar.warning(t('app.enterUsername'));
    return;
  }
  loading.value = true;
  try {
    await userStore.login(formData.name, formData.pwd);
    Snackbar.success(t('app.loginSuccess'));
    await router.replace(getSafeRedirect(route.query.redirect, '/member'));
  } catch (error: unknown) {
    Snackbar.error(getErrorMessage(error, t('app.loginFailed')));
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="login-page">
    <div class="login-card">
      <span class="eyebrow">VARLET ACCOUNT</span>
      <h1>{{ t('app.login') }}</h1>
      <p>{{ t(loginHintKey) }}</p>
      <div class="form-fields">
        <var-input
          v-model="formData.name"
          :placeholder="t('app.enterUsername')"
          clearable
        />
        <var-input
          v-model="formData.pwd"
          type="password"
          :placeholder="t('app.enterPassword')"
          clearable
        />
      </div>
      <var-button block type="primary" :loading="loading" @click="submit">
        {{ t('app.login') }}
      </var-button>
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
      rgb(var(--app-primary-rgb) / 15%),
      transparent 30%
    ),
    var(--app-surface);
}

.login-card {
  padding: 24px;
  background: #fff;
  border: 1px solid var(--app-border);
  border-radius: 24px 12px 24px 24px;
  box-shadow: var(--app-card-shadow);
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

.form-fields {
  display: grid;
  gap: 12px;
  padding: 14px;
  margin-bottom: 18px;
  background: var(--app-primary-soft);
  border-radius: 16px;
}
</style>
