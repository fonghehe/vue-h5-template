<script setup lang="ts">
import ChatPage from '@vh5/mobile-ui/ChatPage.vue';

import { useUserStore } from '@/store/modules/user';
const user = useUserStore();
const endpoint = import.meta.env.VITE_AI_CHAT_ENDPOINT || '/api/ai/chat';
</script>
<template><ChatPage :token="user.token" :endpoint="endpoint" /></template>
