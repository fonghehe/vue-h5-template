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
    <var-swipe :autoplay="3000" :loop="false" :initial-index="page">
      <var-swipe-item style="height: 100vw">
        <var-image :src="details.data.imgUrl" fit="cover" width="100%" height="100%" />
      </var-swipe-item>
    </var-swipe>

    <div class="info">
      <div class="price">
        ￥<em>{{ details.data?.price }}.00</em>
      </div>
      <div class="title">{{ details.data?.title }}</div>
      <div v-if="details.data?.description" class="desc">
        {{ details.data.description }}
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.info {
  padding: 20px;
  .price {
    font-size: 20px;
    font-weight: 600;
    color: #f2270c;
  }

  .price em {
    font-size: 28px;
    font-style: normal;
  }

  .title {
    margin-top: 8px;
  }

  .desc {
    margin-top: 8px;
    color: #999;
    font-size: 14px;
  }
}
</style>
