export interface ProductAttributeProps {
  id: number;
  product_id: string;
  attribute_name: string;
  attribute_value: string;
  attribute_group: string;
  sort_order: number;
}

export interface ProductAttributeResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[];
}
