<script setup lang="ts">
import { to } from "@vh5/utils";
import { getProductList } from "@/api/product";

const router = useRouter();
const list = ref<any[]>([]);

onMounted(async () => {
  const [err, data] = await to(getProductList());
  if (err) {
    console.error("获取商品列表失败", err);
    return;
  }
  if (data.code === 0) {
    list.value = data.data;
  }
});

function toDetails(id: number) {
  router.push({ path: "/details", query: { id } });
}
</script>

<template>
  <section class="product-list">
    <van-cell v-for="item in list" :key="item.id" clickable @click="toDetails(item.id)">
      <template #icon>
        <van-image :src="item.imgUrl" width="90" height="90" fit="cover" radius="8" />
      </template>
      <div class="product-info">
        <div class="product-title">{{ item.title }}</div>
        <div class="product-desc">{{ item.shopDesc }} · {{ item.delivery }}</div>
        <div class="product-bottom">
          <span class="product-price">
            ￥<em>{{ item.price }}</em>
          </span>
          <span class="product-origin-price">￥{{ item.vipPrice }}</span>
          <van-tag type="primary" plain size="medium">{{ item.shopName }}</van-tag>
        </div>
      </div>
    </van-cell>
  </section>
</template>

<style scoped lang="scss">
.product-list {
  :deep(.van-cell) {
    padding: 12px 16px;
    align-items: flex-start;
  }

  :deep(.van-cell__left-icon) {
    margin-right: 12px;
  }
}
</style>
