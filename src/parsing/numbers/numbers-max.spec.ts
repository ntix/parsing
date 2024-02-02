import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-max', () => {
  const max = 10;
  const schema = Is.int.max(max);

  it('success', () => {
    const value = max - 1;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = max + 1;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max, false));
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const exclusiveSchema = Is.int.max(max, true);
    const value = max;
    const result = exclusiveSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max, true));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notMaxSchema = Is.int.not.max(max);

    it('success', () => {
      const value = max + 1;
      const result = notMaxSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = max - 1;
      const result = notMaxSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.max(max, false)));
      expect(result.value).toBe(value);
    });

  });
});
