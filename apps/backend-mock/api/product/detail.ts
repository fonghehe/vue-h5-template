import { eventHandler, getQuery } from 'h3';
import { MOCK_PRODUCTS } from '~/utils/mock-data';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default eventHandler((event) => {
  const { id } = getQuery(event);
  const product = MOCK_PRODUCTS.find(
    (item) => item.id === Number.parseInt(String(id), 10),
  );
  if (!product) {
    return useResponseError('商品不存在');
  }
  return useResponseSuccess(product);
});
