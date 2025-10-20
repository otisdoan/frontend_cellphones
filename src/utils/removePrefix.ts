/* eslint-disable @typescript-eslint/no-explicit-any */
export const removePrefix = (province: any[]) => {
  return province.map((item) => {
    return {
      ...item,
      name: item.name.replace(/^Tỉnh\s*/i, "").replace(/^Thành\s*Phố\s*/i, ""),
    };
  });
};
