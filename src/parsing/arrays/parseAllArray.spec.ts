import { Is } from '../../Is';
import { parseAllArray } from './parseAllArray';
import { ParseErrors } from '../ParseErrors';

describe('parseAllArray', () => {

  interface IModel { name: string, age?: number }
  const parser = Is.for<IModel>({
    name: Is.required.string,
    age: Is.int.min(25)
  });

  it('success', () => {
    const values = [
      { name: 'NAME-1', age: 30 },
      { name: 'NAME-2', age: 32 }
    ];

    const result = parseAllArray(parser.parse)(values);

    expect(result.value).toEqual(values);
    expect(result.errors).toBe(ParseErrors.empty);
  });

  it('failure', () => {
    const values = [
      { name: 'NAME-1', age: 30 },
      { name: 'NAME-2', age: 1 }
    ];

    const result = parseAllArray(parser.parse)(values);

    expect(result.value).toEqual(values);
    expect(result.errors).toEqual({
      '1': { 'age': { 'min': { 'exclusive': false, 'value': 25 } } }
    });
  });
});
