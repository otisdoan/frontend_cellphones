export interface ProductVatiantProp {
  id: number;
  product_id: string;
  variant_name: string;
  sku: string;
  price: number;
  sale_price: number;
  stock_quantity: number;
  image_url: string;
  is_active: boolean;
  capacity: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariantResponse<T> {
  status: string;
  message: string;
  data: T[];
}

export type ProductVariantCapacity = Pick<ProductVatiantProp, "capacity">;
