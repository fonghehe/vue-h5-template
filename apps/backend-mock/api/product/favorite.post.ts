import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { MOCK_PRODUCTS } from '~/utils/mock-data';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ favorite?: boolean; productId?: number }>(
    event,
  );
  const product = MOCK_PRODUCTS.find((item) => item.id === body.productId);
  if (!product || typeof body.favorite !== 'boolean') {
    setResponseStatus(event, 400);
    return useResponseError('Invalid favorite request');
  }
  return useResponseSuccess({
    favorite: body.favorite,
    productId: product.id,
  });
});
