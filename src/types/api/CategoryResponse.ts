export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number;
  parent_name: string;
  image_url: string | undefined;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  update_at: string;
}

export interface CategoryResponse<T> {
  status: string;
  message: string;
  data: T[];
}

export interface CategoryTree {
  value: string;
  title: string;
  children: CategoryTree[];
}
