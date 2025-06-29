export interface LoginResponse {
  status: string;
  message: string;
  data: {
    id: string;
    email: string;
    password_hash: string;
    phone: string;
    full_name: string;
    date_of_birth: string;
    gender: string | null;
    avatar_url: string | null;
    status: "inactive";
    email_verified: boolean;
    phone_verified: boolean;
    createdAt: string;
    updatedAt: string;
    access_token: string;
    refresh_token: string;
  };
}
