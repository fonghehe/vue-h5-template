import { MOCK_PRODUCTS } from './mock-data';

const english = [
  [
    'Fresh crab gift box · 8 pieces',
    'Yangcheng Lake Seafood',
    'Freshly caught crab, packed for your family table.',
  ],
  [
    'Seafood gift card · seasonal selection',
    'Yangcheng Lake Seafood',
    'A carefully selected seafood gift for someone special.',
  ],
  [
    'SUPOR 4L induction rice cooker',
    'SUPOR Official Store',
    'Family-sized cooking with smart scheduling and even heating.',
  ],
  [
    'Apple iPhone 17 · 256GB · White',
    'Apple Store',
    'A bright display and everyday performance in a familiar design.',
  ],
  [
    'Dyson V12 Detect Slim cordless vacuum',
    'Dyson Official Store',
    'Lightweight cordless cleaning with dust detection.',
  ],
] as const;
const japanese = [
  [
    '活ガニギフトボックス · 8杯',
    '陽澄湖シーフード',
    '新鮮なカニを、ご家族の食卓へお届けします。',
  ],
  [
    '海鮮ギフトカード · 季節のセレクション',
    '陽澄湖シーフード',
    '大切な方への贈り物に、厳選した海鮮セット。',
  ],
  [
    'SUPOR 4L IH 炊飯器',
    'SUPOR 公式ストア',
    '予約機能と均一加熱を備えた、家族向けの炊飯器。',
  ],
  [
    'Apple iPhone 17 · 256GB · ホワイト',
    'Apple Store',
    '明るいディスプレイと日常に適した使いやすさ。',
  ],
  [
    'Dyson V12 Detect Slim コードレス掃除機',
    'Dyson 公式ストア',
    'ホコリを検知する軽量コードレスクリーナー。',
  ],
] as const;

/** Demo content negotiation. Real business services own their translations. */
export function getLocalizedProducts(language = 'en-US') {
  if (language.toLowerCase().startsWith('zh')) return MOCK_PRODUCTS;
  const isJapanese = language.toLowerCase().startsWith('ja');
  return MOCK_PRODUCTS.map((product, index) => {
    const copy = (isJapanese ? japanese : english)[index];
    if (!copy) return product;
    return {
      ...product,
      title: copy[0],
      shopName: copy[1],
      description: copy[2],
      shopDesc: isJapanese ? '公式販売店' : 'Official retailer',
      delivery: isJapanese ? '配送対応' : 'Delivery available',
    };
  });
}
