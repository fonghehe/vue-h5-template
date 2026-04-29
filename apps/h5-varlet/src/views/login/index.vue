<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const loading = ref(false);
const formData = reactive({
  name: "user",
  pwd: "123456",
});

async function submit() {
  if (!formData.name || !formData.pwd) {
    Snackbar.warning("请输入用户名和密码");
    return;
  }
  loading.value = true;
  try {
    await userStore.login(formData.name, formData.pwd);
    Snackbar.success("登录成功");
    router.push({ path: "/mine" });
  } catch (error: any) {
    Snackbar.error(error.message || "登录失败");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="p-4">
    <div class="text-center font-600 tracking-[6px]">登录</div>
    <div class="mt-4 bg-[var(--color-background-soft)] rounded-12px p-3">
      <var-input v-model="formData.name" placeholder="请输入用户名" clearable />
      <div class="h-2"></div>
      <var-input v-model="formData.pwd" type="password" placeholder="请输入密码" clearable />
    </div>
    <div class="mt-4">
      <var-button block type="primary" :loading="loading" @click="submit">登录</var-button>
    </div>
  </section>
</template>
