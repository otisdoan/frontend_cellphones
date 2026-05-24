export interface LoginFormType {
  phone: string;
  passwordLogin: string;
}

export interface RegisterFormType {
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  passwordRegister: string;
  confirm_password?: string;
}
