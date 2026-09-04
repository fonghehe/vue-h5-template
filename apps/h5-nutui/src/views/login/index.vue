<script setup lang="ts">
import { getErrorMessage } from '@vh5/api-client';
import { getSafeRedirect } from '@vh5/utils';

import { showToast } from '@nutui/nutui';

import { t } from '@/locales';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const route = useRoute();
const loginHintKey =
  import.meta.env.VITE_NITRO_MOCK === 'true'
    ? 'app.mockLoginHint'
    : 'app.serviceLoginHint';
const formData = reactive({
  name: 'user',
  pwd: '123456',
});
const ruleForm = ref<{
  validate(): Promise<{ errors?: unknown; valid: boolean }>;
}>();
const loading = ref(false);

const submit = async () => {
  if (!ruleForm.value || loading.value) return;
  const { valid, errors } = await ruleForm.value.validate();
  if (!valid) {
    console.warn('validate error', errors);
    return;
  }
  loading.value = true;
  try {
    await userStore.login(formData.name, formData.pwd);
    showToast.success(t('app.loginSuccess'));
    await router.replace(getSafeRedirect(route.query.redirect, '/member'));
  } catch (error: unknown) {
    showToast.fail(getErrorMessage(error, t('app.loginFailed')));
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="login-page">
    <div class="login-card">
      <span class="eyebrow">NUTUI ACCOUNT</span>
      <h1>{{ t('app.login') }}</h1>
      <p>{{ t(loginHintKey) }}</p>
      <nut-form ref="ruleForm" :model-value="formData">
        <nut-form-item
          :label="t('app.username')"
          required
          prop="name"
          :rules="[{ required: true, message: t('app.enterUsername') }]"
          class="form-item"
        >
          <nut-input
            v-model="formData.name"
            :placeholder="t('app.enterUsername')"
            type="text"
            class="bg-transparent"
          />
        </nut-form-item>
        <nut-form-item
          :label="t('app.password')"
          required
          prop="pwd"
          :rules="[{ required: true, message: t('app.enterPassword') }]"
          class="form-item"
        >
          <nut-input
            v-model="formData.pwd"
            :placeholder="t('app.enterPassword')"
            type="password"
            class="bg-transparent"
          />
        </nut-form-item>
        <nut-button
          block
          type="primary"
          role="button"
          tabindex="0"
          :aria-disabled="loading"
          :loading="loading"
          @click="submit"
          @keydown.enter.prevent="submit"
          @keydown.space.prevent="submit"
        >
          {{ t('app.login') }}
        </nut-button>
      </nut-form>
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
      rgb(var(--app-primary-rgb) / 14%),
      transparent 30%
    ),
    var(--app-surface);
}

.login-card {
  padding: 24px;
  background: #fff;
  border: 1px solid var(--app-border);
  border-radius: 22px;
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

.form-item {
  margin-bottom: 18px;
  background: var(--app-primary-soft);
  border-radius: 16px;
}
</style>
