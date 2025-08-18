export interface LoginResponse<T> {
  status: string;
  message: string;
  data: T;
}
