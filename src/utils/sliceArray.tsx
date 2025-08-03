import type { ProductProps } from "../types/api/ProductResponse";

export const sliceArray = (arr: ProductProps[], num: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += num) {
    result.push(arr.slice(i, i + num));
  }
  return result;
};
