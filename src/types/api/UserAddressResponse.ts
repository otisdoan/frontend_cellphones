export interface UserAddressProps {
  id: number;
  userId: number;
  recipientName: string;
  recipientPhone: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  isDefault: boolean;
}

export interface UserAddressResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}
