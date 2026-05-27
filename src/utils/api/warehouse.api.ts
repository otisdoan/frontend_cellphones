import { API_URL } from "../../constants/API_URL";
import type {
  WarehouseProps,
  WarehouseResponse,
} from "../../types/api/WarehouseResponse";
import axiosInstance from "../axios";

export const warehouseApi = {
  getAll: async () => {
    const response = await axiosInstance.get<WarehouseResponse<WarehouseProps>>(
      API_URL.WAREHOUSE
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<WarehouseResponse<WarehouseProps>>(
      `${API_URL.WAREHOUSE}/${id}`
    );
    return response.data;
  },
  create: async (payload: Partial<WarehouseProps>) => {
    const response = await axiosInstance.post<WarehouseResponse<WarehouseProps>>(
      API_URL.WAREHOUSE,
      payload
    );
    return response.data;
  },
  update: async (id: number, payload: Partial<WarehouseProps>) => {
    const response = await axiosInstance.put<WarehouseResponse<WarehouseProps>>(
      `${API_URL.WAREHOUSE}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<
      WarehouseResponse<WarehouseProps>
    >(`${API_URL.WAREHOUSE}/${id}`);
    return response.data;
  },
};
