import { Is } from '../../Is';
import { provideParseArrayValues } from './provideParseArrayValues';
import { ParseErrors } from '../ParseErrors';

describe('parseAllArray', () => {

  interface IModel { name: string, age?: number }
  const schema = Is.for<IModel>({
    name: Is.required.string,
    age: Is.int.min(25)
  });

  it('success', () => {
    const values = [
      { name: 'NAME-1', age: 30 },
      { name: 'NAME-2', age: 32 }
    ];

    const result = provideParseArrayValues(schema.parse)(values);

    expect(result.value).toEqual(values);
    expect(result.errors).toBe(ParseErrors.array);
  });

  it('failure', () => {
    const values = [
      { name: 'NAME-1', age: 30 },
      { name: 'NAME-2', age: 1 }
    ];

    const result = provideParseArrayValues(schema.parse)(values);

    expect(result.value).toEqual(values);
    expect(result.errors).toEqual({
      '1': { 'age': { 'min': { 'exclusive': false, 'value': 25 } } }
    });
  });
});
