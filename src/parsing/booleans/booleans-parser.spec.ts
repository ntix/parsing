import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('booleans-parser', () => {
  const parser = Is.boolean;

  it('success boolean', () => {
    const value = true;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
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
    const value = 'true';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(true);
  });

  it('success string empty', () => {
    const result = parser.parse('');

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(null);
  });

  it('failure not boolean', () => {
    const result = parser.parse('a');

    expect(result.errors).toEqual({
      boolean: true
    });
    expect(result.value).toBe(null);
  });
});
