import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('numbers-min', () => {
  const min = 10;
  const schema = Is.int.min(min);

  it('success', () => {
    const value = min + 1;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success string', () => {
    const value = min + 1;
    const result = schema.parse(`${value}`);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('success null', () => {
    const value = null;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = min - 1;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min, false));
    expect(result.value).toBe(value);
  });

  it('failure exclusive', () => {
    const exclusiveSchema = Is.int.min(min, true);
    const value = min;
    const result = exclusiveSchema.parse(value);

    expect(result.errors).toEqual(ParseErrors.min(min, true));
    expect(result.value).toBe(value);
  });

  describe('not', () => {
    const notMinSchema = Is.int.not.min(min);

    it('success', () => {
      const value = min - 1;
      const result = notMinSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toBe(value);
    });

    it('failure', () => {
      const value = min + 1;
      const result = notMinSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.not(ParseErrors.min(min, false)));
      expect(result.value).toBe(value);
    });

  });
});
