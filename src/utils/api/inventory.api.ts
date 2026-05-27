import { API_URL } from "../../constants/API_URL";
import type {
  InventoryProps,
  InventoryResponse,
} from "../../types/api/InventoryResponse";
import axiosInstance from "../axios";

export const inventoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get<InventoryResponse<InventoryProps>>(
      API_URL.INVENTORY
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<InventoryResponse<InventoryProps>>(
      `${API_URL.INVENTORY}/${id}`
    );
    return response.data;
  },
  create: async (payload: Partial<InventoryProps>) => {
    const response = await axiosInstance.post<InventoryResponse<InventoryProps>>(
      API_URL.INVENTORY,
      payload
    );
    return response.data;
  },
  update: async (id: number, payload: Partial<InventoryProps>) => {
    const response = await axiosInstance.put<InventoryResponse<InventoryProps>>(
      `${API_URL.INVENTORY}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<
      InventoryResponse<InventoryProps>
    >(`${API_URL.INVENTORY}/${id}`);
    return response.data;
  },
};
