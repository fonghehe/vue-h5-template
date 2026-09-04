import { eventHandler, getHeader, getQuery } from 'h3';
import { getLocalizedProducts } from '~/utils/product-locales';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default eventHandler((event) => {
  const { id } = getQuery(event);
  const product = getLocalizedProducts(
    getHeader(event, 'accept-language'),
  ).find((item) => item.id === Number.parseInt(String(id), 10));
  if (!product) {
    return useResponseError('商品不存在');
  }
  return useResponseSuccess(product);
});
