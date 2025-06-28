export interface LoginFormType {
  phone: string;
  password_login: string;
}

export interface RegisterFormType {
  full_name: string;
  date_of_birth: string;
  phone: string;
  email: string;
  password_hash: string;
  confirm_password?: string;
}
