<script setup lang="ts">
import AppErrorBoundary from '@/components/common/AppErrorBoundary.vue';
</script>

<template>
  <AppErrorBoundary>
    <RouterView />
  </AppErrorBoundary>
</template>
