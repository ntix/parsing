import { Is } from '../Is';
import { ParseErrors } from './ParseErrors';

describe('required', () => {
  const parser = Is.required;

  it('success', () => {
    const value = 1;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure undefined', () => {
    const value = undefined;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.required);
    expect(result.value).toBe(value);
  });

  it('failure null', () => {
    const value = null;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.required);
    expect(result.value).toBe(value);
  });

  it('failure empty string', () => {
    const value = '';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.required);
    expect(result.value).toBe(value);
  });
});
