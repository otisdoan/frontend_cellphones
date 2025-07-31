export interface ProductImagesProp {
  id: number;
  product_id: number;
  image_url: string | undefined;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImageResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[];
}
