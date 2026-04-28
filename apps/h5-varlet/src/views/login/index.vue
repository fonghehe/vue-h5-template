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
  <section style="padding: 16px">
    <div style="text-align: center; font-weight: 600; letter-spacing: 6px">登录</div>
    <div
      style="
        margin-top: 16px;
        background: var(--color-background-soft);
        border-radius: 12px;
        padding: 12px;
      "
    >
      <var-input v-model="formData.name" placeholder="请输入用户名" clearable />
      <div style="height: 8px"></div>
      <var-input v-model="formData.pwd" type="password" placeholder="请输入密码" clearable />
    </div>
    <div style="margin-top: 16px">
      <var-button block type="primary" :loading="loading" @click="submit">登录</var-button>
    </div>
  </section>
</template>
