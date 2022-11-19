/**
 * check value is null or undefined or empty string
 *
 * @param value value
 * @returns true if null or undefined
 */
export function isNullOrEmpty(value: unknown): value is null | undefined | '' {
  return value == null || value === '';
}
