export interface BrandProps {
  id: string;
  name: string;
  slug: string;
  logo_url: string | undefined;
  description: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[];
}

export interface BrandSelect {
  value: number;
  label: string;
}
