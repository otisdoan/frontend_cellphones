export interface OrderItemProps {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  product_name: string;
  variant_name: string;
  sku: string;
  price: string;
  quantity: number;
  total: string;
  sale_price: string;
  image_url: string;
  stock_quantity: string;
}

export interface OrderItemResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[];
}
