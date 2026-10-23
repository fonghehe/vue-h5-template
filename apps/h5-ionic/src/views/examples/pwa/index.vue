<script setup lang="ts">
import PwaPage from '@vh5/mobile-ui/PwaPage.vue';
const enabled = import.meta.env.VITE_PWA_ENABLED === 'true';
</script>
<template><PwaPage :enabled="enabled" /></template>
