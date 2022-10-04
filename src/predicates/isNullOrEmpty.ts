/** check for null (or undefined) or empty string */

export function isNullOrEmpty(value: unknown) {
  return value == null || value === '';
}
