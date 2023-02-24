import { Is } from '../Is';
import { ParseErrors } from './ParseErrors';

describe('defined', () => {
  const parser = Is.defined;

  it('success', () => {
    const value = 1;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure undefined', () => {
    const value = undefined;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.defined);
    expect(result.value).toBe(value);
  });

  it('success null', () => {
    const value = null;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success empty string', () => {
    const value = '';
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });
});
