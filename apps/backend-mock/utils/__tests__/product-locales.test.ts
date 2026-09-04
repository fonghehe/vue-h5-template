import { describe, expect, it } from 'vitest';

import { MOCK_PRODUCTS } from '../mock-data';
import { getLocalizedProducts } from '../product-locales';
describe('mock product content negotiation', () => {
  it('defaults to English and preserves ids, prices and original fixtures', () => {
    const products = getLocalizedProducts();
    expect(products[0]?.title).toBe('Fresh crab gift box · 8 pieces');
    expect(products.map((p) => [p.id, p.price])).toEqual(
      MOCK_PRODUCTS.map((p) => [p.id, p.price]),
    );
    expect(MOCK_PRODUCTS[0]?.title).toContain('活蟹');
  });
  it('selects Chinese and Japanese from Accept-Language', () => {
    expect(getLocalizedProducts('zh-CN,zh;q=0.9')).toEqual(MOCK_PRODUCTS);
    expect(getLocalizedProducts('ja-JP,en;q=0.8')[0]?.title).toContain(
      '活ガニ',
    );
    expect(getLocalizedProducts('fr-FR')[0]?.title).toContain('Fresh');
  });
});
