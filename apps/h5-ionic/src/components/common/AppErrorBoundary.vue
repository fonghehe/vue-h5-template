<script setup lang="ts">
import { onErrorCaptured, shallowRef } from 'vue';

const error = shallowRef<Error>();
const showDetails = import.meta.env.DEV;

onErrorCaptured((captured) => {
  error.value =
    captured instanceof Error ? captured : new Error('Application error');
  return false;
});

function retry() {
  error.value = undefined;
}

function reload() {
  window.location.reload();
}
</script>

<template>
  <main v-if="error" class="error-boundary" role="alert">
    <span aria-hidden="true">!</span>
    <h1>Something went wrong</h1>
    <p>Try rendering this screen again or reload the application.</p>
    <small v-if="showDetails">{{ error.message }}</small>
    <div>
      <button type="button" @click="retry">Try again</button>
      <button type="button" class="secondary" @click="reload">Reload</button>
    </div>
  </main>
  <template v-else>
    <slot></slot>
  </template>
</template>

<style scoped>
.error-boundary {
  display: grid;
  place-content: center;
  min-height: 100dvh;
  padding: 32px 24px calc(32px + env(safe-area-inset-bottom));
  color: var(--app-text);
  text-align: center;
  background: var(--app-surface);
}

.error-boundary > span {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin: 0 auto 14px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  background: var(--app-primary);
  border-radius: 14px;
}

.error-boundary h1 {
  margin: 0;
  font-size: 22px;
}

.error-boundary p,
.error-boundary small {
  max-width: 360px;
  margin: 10px auto 16px;
  color: var(--app-text-muted);
}

.error-boundary div {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.error-boundary button {
  min-height: 44px;
  padding: 0 18px;
  color: #fff;
  background: var(--app-primary);
  border: 1px solid var(--app-primary);
  border-radius: 12px;
}

.error-boundary .secondary {
  color: var(--app-text);
  background: #fff;
  border-color: var(--app-border);
}
</style>
