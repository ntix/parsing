import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-min', () => {
  const min = 10.5;
  const schema = Is.float.min(min);

  it('success', () => {
    const value = min + .5;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = min - .5;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min, false));
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const exclusiveSchema = Is.float.min(min, true);
    const value = min;
    const result = exclusiveSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min, true));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notMinSchema = Is.float.not.min(min);

    it('success', () => {
      const value = min - .5;
      const result = notMinSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = min + .5;
      const result = notMinSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.min(min, false)));
      expect(result.value).toBe(value);
    });

  });
});
