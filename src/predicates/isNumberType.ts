/** checks value is a number, includes NaN and Infinity */
export function isNumberType(value: any): value is number {
  return typeof value === 'number';
}
