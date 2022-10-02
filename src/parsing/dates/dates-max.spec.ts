import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dates-max', () => {
  const max = new Date(3000, 0, 1, 0, 0, 0, 0);
  const parser = Is.date.max(max);

  it('success', () => {
    const value = new Date(max.getTime() - 1000);
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('success string', () => {
    const value = `${new Date(max.getTime() - 1000)}`;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(`${result.value}`).toEqual(value);
  });

  it('success null', () => {
    const value = null;
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = new Date(max.getTime() + 1000);
    const result = parser.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max, false));
    expect(result.value).toBe(value);
  });
});
