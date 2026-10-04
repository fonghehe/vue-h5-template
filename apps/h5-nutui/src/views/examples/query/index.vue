<script setup lang="ts">
import QueryPage from '@vh5/mobile-ui/QueryPage.vue';

import { useUserStore } from '@/store/modules/user';
const user = useUserStore();
</script>

<template>
  <QueryPage :session="user.token" />
</template>
