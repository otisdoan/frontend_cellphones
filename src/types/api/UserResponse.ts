export interface UserProps {
  id: number;
  email: string;
  passwordHash: string;
  phone: string;
  fullName: string;
  dateOfBirth: string;
  gender: string | null;
  avatarUrl: string | null;
  status: "active" | "inactive";
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}
