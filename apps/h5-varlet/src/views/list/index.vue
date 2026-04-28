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
    <var-cell v-for="item in list" :key="item.id" ripple @click="toDetails(item.id)">
      <template #icon>
        <var-image :src="item.imgUrl" width="90" height="90" fit="cover" radius="8" />
      </template>
      <div class="product-info">
        <div class="product-title">{{ item.title }}</div>
        <div class="product-desc">{{ item.shopDesc }} · {{ item.delivery }}</div>
        <div class="product-bottom">
          <span class="product-price">
            ￥<em>{{ item.price }}</em>
          </span>
          <span class="product-origin-price">￥{{ item.vipPrice }}</span>
          <span class="product-shop">{{ item.shopName }}</span>
        </div>
      </div>
    </var-cell>
  </section>
</template>

<style scoped lang="scss">
.product-list {
  :deep(.var-cell) {
    padding: 12px 16px;
    align-items: flex-start;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
