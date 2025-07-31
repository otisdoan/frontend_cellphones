export interface ProductProps {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category_id: string;
  brand_id: string;
  short_description: string;
  full_description: string;
  price: string;
  sale_price: string;
  cost_price: string;
  weight: string;
  dimensions: string;
  warranty_period: number;
  is_featured: boolean;
  status: "active" | "inactive";
  rating_average: string;
  rating_count: number;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSelect {
  value: number;
  label: string;
}

export interface ProductResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[];
}
