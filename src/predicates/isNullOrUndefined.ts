/**
 * check value is null or undefined
 *
 * @param value value
 * @returns true if null or undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
