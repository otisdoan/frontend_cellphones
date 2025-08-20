export const formatCurrency = (price: number) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "đ",
  });
};
