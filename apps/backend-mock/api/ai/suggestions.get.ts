import { defineEventHandler, getQuery } from 'h3';
import { useResponseSuccess } from '~/utils/response';
export default defineEventHandler((event) => {
  const locale = getQuery(event).locale;
  if (locale === 'zh-CN')
    return useResponseSuccess([
      '帮我比较商品，看看哪款更适合我。',
      '下单前需要确认哪些信息？',
      '解释一下 AI 流式回复是怎么实现的。',
    ]);
  if (locale === 'ja-JP')
    return useResponseSuccess([
      '商品の比較を手伝ってください。',
      '注文前に確認することは？',
      'AI のストリーミングの仕組みを教えてください。',
    ]);
  return useResponseSuccess([
    'Help me compare products before buying.',
    'What should I check before placing an order?',
    'Explain how streaming AI responses work.',
  ]);
});
