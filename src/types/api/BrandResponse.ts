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

export interface BrandResponse {
  status: "success" | "error";
  message: string;
  data: BrandProps[];
}
