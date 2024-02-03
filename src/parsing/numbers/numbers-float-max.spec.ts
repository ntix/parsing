import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-max', () => {
  const max = 10.5;
  const schema = Is.float.max(max);

  it('success', () => {
    const value = max - .5;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = max + .5;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max, false));
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const exclusiveSchema = Is.float.max(max, true);
    const value = max;
    const result = exclusiveSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.max(max, true));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notMaxSchema = Is.float.not.max(max);

    it('success', () => {
      const value = max + .5;
      const result = notMaxSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = max - .5;
      const result = notMaxSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.max(max, false)));
      expect(result.value).toBe(value);
    });

  });
});
