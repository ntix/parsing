import { IParse } from '../IParse';
import { Dictionary } from './Dictionary';

/**
 * uses a dictionaries values to check the length
 *
 * @param inner inner parse function
 * @returns a dictionary values result
 */
export function provideDictionaryValues<T>(
  inner: IParse<T[]>
): IParse<Dictionary<T>> {

  return (value: Dictionary<T>) => {

    const result = inner(Object.values(value));

    return {
      ...result,
      value
    };
  };
}
