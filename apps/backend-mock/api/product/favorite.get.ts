import { defineEventHandler, getQuery, setResponseStatus } from 'h3';
import { getFavorite } from '~/utils/favorites';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_PRODUCTS } from '~/utils/mock-data';
import {
  unAuthorizedResponse,
  useResponseError,
  useResponseSuccess,
} from '~/utils/response';
export default defineEventHandler((event) => {
  const user = verifyAccessToken(event);
  if (!user) return unAuthorizedResponse(event);
  const id = Number(getQuery(event).id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    setResponseStatus(event, 400);
    return useResponseError('id must be a positive integer');
  }
  if (!MOCK_PRODUCTS.some((product) => product.id === id)) {
    setResponseStatus(event, 404);
    return useResponseError('Product not found');
  }
  return useResponseSuccess(getFavorite(user.id, id));
});
