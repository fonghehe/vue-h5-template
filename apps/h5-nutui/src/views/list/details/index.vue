<script setup lang="ts">
import DetailsPage from '@vh5/mobile-ui/DetailsPage.vue';

import { useUserStore } from '@/store/modules/user';
const user = useUserStore();
</script>

<template>
  <DetailsPage :session="user.token" />
</template>
