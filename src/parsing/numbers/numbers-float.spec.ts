import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float', () => {
  const parser = Is.float;

  it('success number', () => {
    const result = parser.parse(1);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(1);
  });

  it('success undefined', () => {
    const result = parser.parse(undefined);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(undefined);
  });

  it('success null', () => {
    const result = parser.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('success string', () => {
    const result = parser.parse('1');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(1);
  });

  it('success string empty', () => {
    const result = parser.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not number', () => {
    const result = parser.parse('a');

    expect(result.errors).toEqual({
      float: true
    });
    expect(result.value).toBe(null);
  });
});
