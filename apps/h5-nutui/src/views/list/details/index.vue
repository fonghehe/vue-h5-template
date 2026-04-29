<template>
  <nut-swiper
    :init-page="page"
    :pagination-visible="true"
    pagination-color="#426543"
    auto-play="3000"
  >
    <nut-swiper-item class="h-100vw">
      <img class="w-full h-full" :src="details.data.imgUrl" />
    </nut-swiper-item>
  </nut-swiper>

  <section class="p-5">
    <div>
      <span class="text-16px text-#f2270c">
        ￥<em class="text-28px not-italic">{{ details.data?.price }}.00</em>
      </span>
    </div>
    <div class="mt-2">
      <span>{{ details.data?.title }}</span>
    </div>
    <div v-if="details.data?.description" class="mt-2 text-14px text-#999">
      {{ details.data.description }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { getProductDetail } from "@/api/product";
import { to } from "@vh5/utils";

const router = useRouter();
const page = ref(1);

const details = reactive<any>({ data: {} });

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
  },
  { immediate: true },
);
</script>
