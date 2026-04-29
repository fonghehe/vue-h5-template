<script setup lang="ts">
import { to } from "@vh5/utils";
import { getProductDetail } from "@/api/product";

const router = useRouter();
const page = ref(0);
const details = reactive<{ data: any }>({ data: {} });

watch(
  () => router.currentRoute.value.query.id,
  async (id) => {
    if (!id) return;
    const [err, data] = await to(getProductDetail(String(id)));
    if (err) {
      console.error("获取商品详情失败", err);
      return;
    }
    if (data.code === 0) {
      details.data = data.data;
    }
    page.value = 0;
  },
  { immediate: true },
);
</script>

<template>
  <section>
    <van-swipe :loop="false" :initial-swipe="page" :autoplay="3000" lazy-render>
      <van-swipe-item>
        <van-image :src="details.data.imgUrl" fit="contain" width="100%" />
      </van-swipe-item>
    </van-swipe>

    <div class="p-5">
      <div class="text-20px font-600 text-#f2270c">
        ￥<em class="text-28px not-italic">{{ details.data?.price }}.00</em>
      </div>
      <div class="mt-2">{{ details.data?.title }}</div>
      <div v-if="details.data?.description" class="mt-2 text-14px text-#999">
        {{ details.data.description }}
      </div>
    </div>
  </section>
</template>
