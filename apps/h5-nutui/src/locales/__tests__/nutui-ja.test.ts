import English from '@nutui/nutui/dist/packages/locale/lang/en-US';
import { describe, expect, it } from 'vitest';

import Japanese from '../nutui-ja';
describe('nutui Japanese locale', () => {
  it('covers the native locale contract including functional calendar labels', () => {
    const ja = new Japanese();
    expect(Object.keys(ja).toSorted()).toEqual(
      Object.keys(new English()).toSorted(),
    );
    expect(ja.confirm).toBe('確認');
    expect(ja.calendaritem.monthTitle(2026, 9)).toBe('2026年9月');
    expect(ja.comment.additionalImages(3)).toContain('3');
  });
});
