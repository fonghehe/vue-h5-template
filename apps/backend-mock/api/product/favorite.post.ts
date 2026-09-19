import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { setFavorite } from '~/utils/favorites';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_PRODUCTS } from '~/utils/mock-data';
import {
  unAuthorizedResponse,
  useResponseError,
  useResponseSuccess,
} from '~/utils/response';

export default defineEventHandler(async (event) => {
  const user = verifyAccessToken(event);
  if (!user) return unAuthorizedResponse(event);
  const body = await readBody<{ favorite?: boolean; productId?: number }>(
    event,
  );
  const product = MOCK_PRODUCTS.find((item) => item.id === body.productId);
  if (!product || typeof body.favorite !== 'boolean') {
    setResponseStatus(event, 400);
    return useResponseError('Invalid favorite request');
  }
  return useResponseSuccess(setFavorite(user.id, product.id, body.favorite));
});
