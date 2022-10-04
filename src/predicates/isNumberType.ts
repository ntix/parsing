/** checks value is a number, includes NaN and Infinity */
export function isNumberType(value: unknown): value is number {
  return typeof value === 'number';
}
