/* eslint-disable @typescript-eslint/no-explicit-any */
export const customSelectAntd = (options: any[]) => {
  return options.map((option) => {
    return {
      label: option.name,
      value: option.name,
      "data-code": option.code,
    };
  });
};
