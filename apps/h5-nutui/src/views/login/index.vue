<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/modules/user";
import { showToast } from "@nutui/nutui";

const userStore = useUserStore();
const formData = reactive({
  name: "user",
  pwd: "123456",
});
const ruleForm = ref<any>(null);
const loading = ref(false);

const submit = async () => {
  const { valid, errors } = await ruleForm.value.validate();
  if (!valid) {
    console.warn("validate error", errors);
    return;
  }
  loading.value = true;
  try {
    await userStore.login(formData.name, formData.pwd);
    showToast.success("登录成功");
    router.push({ path: "/mine" });
  } catch (error: any) {
    showToast.fail(error.message || "登录失败");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-5">
    <h2 class="text-center tracking-widest mb-5">登录</h2>
    <nut-form ref="ruleForm" :model-value="formData">
      <nut-form-item
        label="用户名"
        required
        prop="name"
        :rules="[{ required: true, message: '请输入用户名' }]"
        class="mb-5 bg-#f2f3f5 rounded-20px"
      >
        <nut-input
          v-model="formData.name"
          placeholder="请输入用户名"
          type="text"
          class="bg-transparent"
        />
      </nut-form-item>
      <nut-form-item
        label="密码"
        required
        prop="pwd"
        :rules="[{ required: true, message: '请输入密码' }]"
        class="mb-5 bg-#f2f3f5 rounded-20px"
      >
        <nut-input
          v-model="formData.pwd"
          placeholder="请输入密码"
          type="password"
          class="bg-transparent"
        />
      </nut-form-item>
      <nut-button block type="info" :loading="loading" @click="submit"> 登录 </nut-button>
    </nut-form>
  </div>
</template>
