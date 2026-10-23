<script setup lang="ts">
import RouteLoadError from '@vh5/mobile-ui/RouteLoadError.vue';
import { stopProgress } from '@vh5/utils';

import AppErrorBoundary from '@/components/common/AppErrorBoundary.vue';
</script>

<template>
  <RouteLoadError @failure="stopProgress" />
  <AppErrorBoundary>
    <RouterView />
  </AppErrorBoundary>
</template>
