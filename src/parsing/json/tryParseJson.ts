import { isNullOrEmpty, isStringType } from '../../predicates';

/**
 * try and parse the value as a json object T
 *
 * @param value value to parse
 * @returns T or a null if failed parse or null or empty value
 */

export function tryParseJson<T>(value: unknown): T | null {

  if (isNullOrEmpty(value)) return null;

  if (isStringType(value))
    try {
      const parsed = JSON.parse(value);

      return parsed as T;
    } catch (error) {
      console.warn(error);
    }

  return null;
}
