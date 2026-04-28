import { eventHandler, getQuery } from 'h3';
import { MOCK_PRODUCTS } from '~/utils/mock-data';
import { usePageResponseSuccess, useResponseSuccess } from '~/utils/response';

export default eventHandler((event) => {
  const { page, pageSize } = getQuery(event);
  if (page && pageSize) {
    return usePageResponseSuccess(
      String(page),
      String(pageSize),
      MOCK_PRODUCTS,
    );
  }
  return useResponseSuccess(MOCK_PRODUCTS);
});
