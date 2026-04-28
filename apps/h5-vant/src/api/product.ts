export interface ProductItem {
  id: number;
  title: string;
  imgUrl: string;
  price: string;
  vipPrice: string;
  shopDesc: string;
  delivery: string;
  shopName: string;
  description: string;
}

interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

export async function getProductList() {
  const res = await fetch('/api/product/list');
  return (await res.json()) as ApiResponse<ProductItem[]>;
}

export async function getProductDetail(id: number | string) {
  const res = await fetch(`/api/product/detail?id=${id}`);
  return (await res.json()) as ApiResponse<ProductItem>;
}
