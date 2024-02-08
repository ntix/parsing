import { parseDate } from './parseDate';

describe('parseDate', () => {

  it('success', () => {
    const result = parseDate('3000-02-01');

    expect(result).toEqual(new Date('3000-02-01'));
  });

  it('throws not a date', () => {
    expect(() => parseDate('ooo'))
      .toThrow();
  });
});
