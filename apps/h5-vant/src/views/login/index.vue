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
    showToast("请输入用户名和密码");
    return;
  }
  loading.value = true;
  try {
    await userStore.login(formData.name, formData.pwd);
    showToast("登录成功");
    router.push({ path: "/mine" });
  } catch (error: any) {
    showToast(error.message || "登录失败");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section>
    <van-form ref="formRef">
      <van-cell-group inset>
        <van-field
          v-model="formData.name"
          name="name"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="formData.pwd"
          type="password"
          name="pwd"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <div style="padding: 16px">
        <van-button block type="primary" :loading="loading" @click="submit"> 登录 </van-button>
      </div>
    </van-form>
  </section>
</template>
