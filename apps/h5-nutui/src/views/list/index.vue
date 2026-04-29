<script setup lang="ts">
import { getProductList } from "@/api/product";
import { to } from "@vh5/utils";

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

const toDetails = (id: number) => {
  router.push({ path: "/details", query: { id } });
};
</script>

<template>
  <nut-card
    v-for="item in list"
    :key="item.id"
    :img-url="item.imgUrl"
    :title="item.title"
    :price="item.price"
    :vip-price="item.vipPrice"
    :shop-name="item.shopName"
    :shop-desc="item.shopDesc"
    :delivery="item.delivery"
    class="py-15px border-b border-b-#e5e5e5"
    @click="(_e: any) => toDetails(item.id)"
  />
</template>
