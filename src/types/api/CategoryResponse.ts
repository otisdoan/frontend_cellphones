export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  update_at: string;
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: CategoryProps[];
}
