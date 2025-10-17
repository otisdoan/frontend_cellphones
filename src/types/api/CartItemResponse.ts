export interface CartItemProps {
  id: string;
  user_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | T[];
}
