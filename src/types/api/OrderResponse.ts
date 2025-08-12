export interface OrderProps {
  id: number;
  order_number: string;
  user_id: string;
  guest_email: string;
  guest_phone: string;
  status: string;
  payment_status: string;
  payment_method: string;
  subtotal: string;
  discount_amount: string;
  shipping_fee: string;
  tax_amount: string;
  total_amount: string;
  currency: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface OrderResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}
