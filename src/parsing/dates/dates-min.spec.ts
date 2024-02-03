import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dates-min', () => {
  const min = new Date(3000, 0, 1, 0, 0, 0, 0);
  const schema = Is.date.min(min);

  it('success', () => {
    const value = new Date(min.getTime() + 1000);
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual(value);
  });

  it('success string', () => {
    const value = `${new Date(min.getTime() + 1000)}`;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(`${result.value}`).toEqual(value);
  });

  it('success null', () => {
    const value = null;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = new Date(min.getTime() - 1000);
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min, false));
    expect(result.value).toBe(value);
  });
});
