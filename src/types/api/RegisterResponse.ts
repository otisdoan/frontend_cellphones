export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    status: string;
    email_verified: boolean;
    phone_verified: boolean;
    id: string;
    full_name: string;
    date_of_birth: string;
    phone: string;
    email: string;
    password_hash: string;
    updatedAt: string;
    createdAt: string;
    gender: string | null;
    avatar_url: string | null;
  };
}
