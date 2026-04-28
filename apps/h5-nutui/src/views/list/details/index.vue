<template>
  <nut-swiper
    :init-page="page"
    :pagination-visible="true"
    pagination-color="#426543"
    auto-play="3000"
  >
    <nut-swiper-item style="height: 100vw">
      <img :src="details.data.imgUrl" />
    </nut-swiper-item>
  </nut-swiper>

  <section class="info">
    <div>
      <span class="price">
        ￥<em>{{ details.data?.price }}.00</em>
      </span>
    </div>
    <div>
      <span>{{ details.data?.title }}</span>
    </div>
    <div v-if="details.data?.description" class="desc">
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

<style lang="scss" scoped>
.nut-swiper-item {
  line-height: 200px;

  img {
    width: 100%;
    height: 100%;
  }
}

.info {
  padding: 20px;

  .price {
    display: inline-block;
    font-size: 16px;
    color: #f2270c;

    em {
      font-size: 28px;
      font-style: normal;
    }
  }
}
</style>
