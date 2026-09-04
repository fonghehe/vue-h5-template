import { eventHandler, getHeader, getQuery } from 'h3';
import { getLocalizedProducts } from '~/utils/product-locales';
import { usePageResponseSuccess } from '~/utils/response';

export default eventHandler((event) => {
  const { page = 1, pageSize = 10 } = getQuery(event);
  return usePageResponseSuccess(
    String(page),
    String(pageSize),
    getLocalizedProducts(getHeader(event, 'accept-language')),
  );
});
