/** check for null (or undefined) or empty string */

export function isNullOrEmpty(value: any) {
  return value == null || value === '';
}
