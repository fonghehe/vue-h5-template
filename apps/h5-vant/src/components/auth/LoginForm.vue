<script setup lang="ts">
import { reactive } from 'vue';

import { $t as t } from '@vh5/locales';

withDefaults(defineProps<{ loading?: boolean }>(), { loading: false });

const emit = defineEmits<{
  submit: [credentials: { password: string; username: string }];
}>();

const form = reactive({ password: '123456', username: 'user' });

function submit() {
  if (!form.username.trim() || !form.password) return;
  emit('submit', { password: form.password, username: form.username.trim() });
}
</script>

<template>
  <form class="login-form" aria-label="Login form" @submit.prevent="submit">
    <label>
      <span>{{ t('app.username') }}</span>
      <input
        v-model="form.username"
        autocomplete="username"
        data-testid="username"
        :placeholder="t('app.enterUsername')"
      />
    </label>
    <label>
      <span>{{ t('app.password') }}</span>
      <input
        v-model="form.password"
        autocomplete="current-password"
        data-testid="password"
        :placeholder="t('app.enterPassword')"
        type="password"
      />
    </label>
    <button :disabled="loading" data-testid="login-submit" type="submit">
      {{ loading ? t('mobile.loading') : t('app.login') }}
    </button>
  </form>
</template>

<style scoped>
.login-form {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 7px;
  font-size: 12px;
  color: #68727e;
}

input {
  width: 100%;
  padding: 13px 14px;
  font: inherit;
  color: #202933;
  outline: none;
  background: #f6f8fa;
  border: 1px solid #e3e8ec;
  border-radius: 13px;
}

input:focus {
  border-color: var(--van-primary-color);
  box-shadow: 0 0 0 3px rgb(var(--app-primary-rgb) / 12%);
}

button {
  min-height: 46px;
  margin-top: 4px;
  font: inherit;
  font-weight: 600;
  color: #fff;
  background: var(--van-primary-color);
  border: 0;
  border-radius: 14px;
}

button:disabled {
  opacity: 0.6;
}
</style>
