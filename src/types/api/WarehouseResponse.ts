export interface WarehouseProps {
  id: number;
  name: string;
  code: string;
  address: string;
  phone: string;
  managerName?: string;
  isActive: boolean;
}

export interface WarehouseResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}
