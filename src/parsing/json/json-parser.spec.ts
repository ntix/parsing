import { Is } from '../../Is';
import { ParseErrors } from '../ParseErrors';

describe('json-parser', () => {
  const schema = Is.required.json;

  it('success', () => {
    const value = '{}';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.empty);
    expect(result.value).toEqual({});
  });

  it('failure', () => {
    const warn = console.warn;
    console.warn = jest.fn();

    const value = '{';
    const result = schema.parse(value);

    expect(result.errors).toEqual(ParseErrors.json);
    expect(result.value).toBe(null);

    expect(console.warn).toHaveBeenCalled();
    console.warn = warn;
  });

  it('required', () => {

    const result = schema.parse(null);

    expect(result.errors).toEqual(ParseErrors.required);
  });

  it('not required', () => {
    const requiredSchema = Is.json;

    const result = requiredSchema.parse(null);

    expect(result.errors).toEqual(ParseErrors.empty);
  });

  describe('and complex', () => {

    const complexSchema = schema.for({
      date: Is.required.date
    });

    it('success', () => {
      const value = '{"date":"1 Jan 2000"}';
      const result = complexSchema.parse(value);

      expect(result.errors).toEqual(ParseErrors.empty);
      expect(result.value).toEqual({ 'date': new Date('2000-01-01T00:00:00.000Z') });
    });
  });

  // todo
  // describe('and keyed', () => {
  //   const keyedSchema = schema.forKeyed(
  //     Is.string,
  //     {
  //       date: Is.required.date
  //     }
  //   );

  //   it('success', () => {
  //     const value = '{"a":{"date":"1 Jan 2000"}}';
  //     const result = keyedSchema.parse(value);

  //     expect(result.errors).toEqual(ParseErrors.empty);
  //     expect(result.value).toEqual({ 'date': new Date('2000-01-01T00:00:00.000Z') });
  //   });

  //   it('failure', () => {
  //     const value = '{"a":{"date":"1 Jan 2000"}}';
  //     const result = keyedSchema.parse(value);

  //     expect(result.errors).toEqual(ParseErrors.unique);
  //     expect(result.value).toEqual({ 'date': new Date('2000-01-01T00:00:00.000Z') });
  //   });
  // });
});
