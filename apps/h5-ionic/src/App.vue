<script setup lang="ts">
import { RouterView } from 'vue-router';

import RouteLoadError from '@vh5/mobile-ui/RouteLoadError.vue';
import { stopProgress } from '@vh5/utils';

import { IonApp } from '@ionic/vue';

import AppErrorBoundary from '@/components/common/AppErrorBoundary.vue';
</script>

<template>
  <IonApp>
    <RouteLoadError @failure="stopProgress" />
    <AppErrorBoundary>
      <RouterView />
    </AppErrorBoundary>
  </IonApp>
</template>
