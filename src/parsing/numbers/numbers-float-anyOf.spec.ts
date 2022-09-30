import { Schema } from '../../Schema';
import { ParseErrors } from '../ParseErrors';

describe('numbers-float-anyOf', () => {
  const anyOf = [1.1, 2, 4.2, 5.3];

  it('anyOf success', () => {
    const result = new Schema().float().anyOf(anyOf).parse(anyOf[2]);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toBe(4.2);
  });

  it('anyOf failure', () => {
    const result = new Schema().float().anyOf(anyOf).parse('3.3');

    expect(result.errors).toEqual(ParseErrors.anyOf(anyOf));
    expect(result.value).toBe(3.3);
  });
});
