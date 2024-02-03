import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('dictionaries-parser', () => {
  const schema = Is.required.dictionary;

  it('success', () => {
    const value = { a: '1' };
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(value);
  });

  it('failure', () => {
    const value = 1;
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.dictionary);
    expect(result.value).toBe(null);
  });

  it('required', () => {

    const result = schema.parse(null);

    expect(result.errors).toEqual(ParseErrors.required);
  });

  it('not required', () => {
    const requiredSchema = Is.dictionary;

    const result = requiredSchema.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
  });

  it('each', () => {
    const eachParser = schema.each(Is.int);

    const value = { a: '1' };
    const result = eachParser.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual({ a: 1 });
  });
});
