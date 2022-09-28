/** checks value is a string */
export function isStringType(value: any): value is string {
  return typeof value === 'string';
}
