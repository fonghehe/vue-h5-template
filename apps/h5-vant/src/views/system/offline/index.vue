<template>
  <main class="offline-page">
    <span aria-hidden="true">⌁</span>
    <h1>You’re offline</h1>
    <p>
      Reconnect to load live API data. Previously built static pages may remain
      available.
    </p>
    <RouterLink to="/home">Back home</RouterLink>
  </main>
</template>

<style scoped>
.offline-page {
  display: grid;
  place-content: center;
  min-height: 100dvh;
  padding: 32px 24px calc(32px + env(safe-area-inset-bottom));
  text-align: center;
  background: #fafbfd;
}

.offline-page > span {
  font-size: 40px;
  color: #7d8692;
}

.offline-page h1 {
  margin: 10px 0 5px;
  font-size: 24px;
}

.offline-page p {
  max-width: 360px;
  margin: 0 auto 18px;
  line-height: 1.6;
  color: #747e8c;
}

.offline-page a {
  display: grid;
  place-items: center;
  min-height: 44px;
  padding: 0 18px;
  color: #fff;
  text-decoration: none;
  background: var(--van-primary-color);
  border-radius: 8px;
}
</style>
