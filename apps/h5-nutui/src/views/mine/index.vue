<script setup lang="ts">
import MemberPage from '@vh5/mobile-ui/MemberPage.vue';

import { useUserStore } from '@/store/modules/user';
const user = useUserStore();
</script>
<template>
  <MemberPage
    :logged-in="user.isLoggedIn"
    :name="user.getUserInfo.realName"
    :avatar="user.getUserInfo.avatar"
    :logout="() => user.logout()"
  />
</template>
