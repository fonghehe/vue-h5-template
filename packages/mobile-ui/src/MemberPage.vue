<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
const displayName = computed(
  () => props.name?.trim() || t('mobile.memberFallback'),
);
const busy = ref(false);
const failed = ref(false);
const avatarLoaded = ref(false);
watch(
  () => [props.avatar, props.loggedIn],
  () => {
    avatarLoaded.value = false;
  },
);
async function signOut() {
  if (busy.value) return;
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
  <section class="product-page member-page">
    <header class="member-heading">
      <h1>{{ t('mobile.personalCenter') }}</h1>
      <p class="muted">{{ t('mobile.personalCenterDesc') }}</p>
    </header>
    <div class="panel profile-panel">
      <div class="avatar" aria-hidden="true">
        <span v-if="!avatarLoaded" class="avatar-fallback">
          {{ loggedIn ? displayName.slice(0, 1).toLocaleUpperCase() : '—' }}
        </span>
        <img
          v-if="loggedIn && avatar"
          v-show="avatarLoaded"
          :src="avatar"
          alt=""
          @load="avatarLoaded = true"
          @error="avatarLoaded = false"
        />
      </div>
      <h2>{{ loggedIn ? displayName : t('mobile.guest') }}</h2>
      <p class="muted">
        {{ t(loggedIn ? 'app.welcomeBack' : 'app.notLoggedIn') }}
      </p>
      <RouterLink v-if="!loggedIn" class="action" to="/login">
        {{ t('app.pleaseLogin') }}
      </RouterLink>
    </div>
    <section class="panel" aria-labelledby="account-heading">
      <h2 id="account-heading">{{ t('mobile.accountInfo') }}</h2>
      <dl class="account-details">
        <div v-if="loggedIn">
          <dt>{{ t('mobile.displayName') }}</dt>
          <dd>{{ displayName }}</dd>
        </div>
        <div>
          <dt>{{ t('mobile.accountStatus') }}</dt>
          <dd>
            {{ t(loggedIn ? 'mobile.sessionActive' : 'mobile.sessionGuest') }}
          </dd>
        </div>
      </dl>
    </section>
    <section class="panel" aria-labelledby="preferences-heading">
      <h2 id="preferences-heading">{{ t('mobile.preferences') }}</h2>
      <LanguageSelect />
    </section>
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
.member-heading {
  margin-bottom: 22px;
}

.member-heading h1,
.profile-panel h2 {
  font-weight: 700;
}

.profile-panel {
  background: linear-gradient(
    135deg,
    var(--app-surface-raised),
    var(--app-primary-soft)
  );
}

.avatar {
  position: relative;
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  overflow: hidden;
  color: var(--app-primary-deep);
  background: var(--app-primary-soft);
  border-radius: 50%;
}

.avatar img,
.avatar-fallback {
  width: 100%;
  height: 100%;
}

.avatar img {
  display: block;
  object-fit: cover;
}

.avatar-fallback {
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
  color: var(--app-primary-deep);
  background: var(--app-primary-soft);
}

.profile-panel h2,
.account-details dd {
  overflow-wrap: anywhere;
}

.account-details {
  margin: 0;
}

.account-details > div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--app-border);
}

.account-details > div:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.account-details dt {
  color: var(--app-text-muted);
}

.account-details dd {
  min-width: 0;
  margin: 0;
  font-weight: 600;
}

.member-page > button {
  width: 100%;
}
</style>
