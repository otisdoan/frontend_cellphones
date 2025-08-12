export interface UserProps {
  id: number;
  email: string;
  password_hash: string;
  phone: string;
  full_name: string;
  date_of_birth: string;
  gender: string | null;
  avatar_url: string | null;
  status: "active" | "inactive";
  role: string;
  email_verified: boolean;
  phone_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}
