/** is an array of numbers or a map of numbers */
export type NumberArrayOrEnumMap =
  | number[]
  | {
      [n: string]: string | number;
    };
