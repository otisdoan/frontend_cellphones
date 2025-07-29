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

export interface CategoryResponse {
  status: string;
  message: string;
  data: CategoryProps[];
}

interface CategoryTree {
  value: string;
  title: string;
  children: CategoryTree[];
}
export interface AllCategoryType {
  status: string;
  message: string;
  data: CategoryTree[];
}
