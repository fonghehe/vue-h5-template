<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getErrorMessage } from '@vh5/api-client';
import { $t as t } from '@vh5/locales';
import { getSafeRedirect } from '@vh5/utils';

import { IonButton, IonInput } from '@ionic/vue';

import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const mockEnabled =
  import.meta.env.DEV && import.meta.env.VITE_NITRO_MOCK === 'true';
const hint = mockEnabled ? 'app.mockLoginHint' : 'app.serviceLoginHint';
const form = reactive({
  name: mockEnabled ? 'user' : '',
  password: mockEnabled ? '123456' : '',
});
const loading = ref(false);
const errorMessage = ref('');

async function submit() {
  if (loading.value) return;
  errorMessage.value = '';
  if (!form.name || !form.password) {
    errorMessage.value = t(
      form.name ? 'app.enterPassword' : 'app.enterUsername',
    );
    return;
  }

  loading.value = true;
  try {
    await user.login(form.name, form.password);
    await router.replace(getSafeRedirect(route.query.redirect, '/member'));
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error, t('app.loginFailed'));
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="login-page">
    <h1>{{ t('app.login') }}</h1>
    <p>{{ t(hint) }}</p>
    <form @submit.prevent="submit">
      <IonInput
        v-model="form.name"
        name="username"
        autocomplete="username"
        fill="outline"
        :label="t('app.username')"
        :placeholder="t('app.enterUsername')"
      />
      <IonInput
        v-model="form.password"
        type="password"
        name="password"
        autocomplete="current-password"
        fill="outline"
        :label="t('app.password')"
        :placeholder="t('app.enterPassword')"
      />
      <p v-if="errorMessage" class="login-error" role="alert">
        {{ errorMessage }}
      </p>
      <IonButton type="submit" expand="block" :disabled="loading">
        {{ t('app.login') }}
      </IonButton>
    </form>
  </section>
</template>

<style scoped>
.login-page {
  box-sizing: border-box;
  width: min(100%, 520px);
  padding: 28px 16px 20px;
  margin-inline: auto;
}

h1 {
  margin: 0 0 8px;
  font-size: 24px;
}

p {
  margin: 0 0 20px;
  color: var(--app-text-muted);
}

form {
  display: grid;
  gap: 12px;
}

form > :deep(button),
form > ion-button {
  min-height: 44px;
}

.login-error {
  margin: 0;
  color: #a51d22;
}
</style>
