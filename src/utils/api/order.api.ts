import { API_URL } from "../../constants/API_URL";
import type { OrderProps, OrderResponse } from "../../types/api/OrderResponse";
import axiosInstance from "../axios";

export const orderApi = {
  getAll: async () => {
    const response = await axiosInstance.get<OrderResponse<OrderProps>>(
      API_URL.ORDER
    );
    return response.data;
  },
  getById: async (id: number | string) => {
    const response = await axiosInstance.get<OrderResponse<OrderProps>>(
      `${API_URL.ORDER}/${id}`
    );
    return response.data;
  },
  create: async (payload: OrderProps) => {
    const response = await axiosInstance.post<OrderResponse<OrderProps>>(
      API_URL.ORDER,
      payload
    );
    return response.data;
  },
  update: async (id: number | string, payload: Partial<OrderProps>) => {
    const response = await axiosInstance.put<OrderResponse<OrderProps>>(
      `${API_URL.ORDER}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number | string) => {
    const response = await axiosInstance.delete<OrderResponse<OrderProps>>(
      `${API_URL.ORDER}/${id}`
    );
    return response.data;
  },
};
