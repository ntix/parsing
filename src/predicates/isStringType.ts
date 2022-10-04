/** checks value is a string */
export function isStringType(value: unknown): value is string {
  return typeof value === 'string';
}
