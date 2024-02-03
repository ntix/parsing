import { parseFloat } from './parseFloat';

describe('parseFloat', () => {

  it('success number', () => {
    const result = parseFloat('1.1');

    expect(result).toBe(1.1);
  });

  it('success number int', () => {
    const result = parseFloat('1');

    expect(result).toBe(1.0);
  });

  it('throws not a number', () => {
    expect(() => parseFloat('ooo'))
      .toThrow();
  });
});