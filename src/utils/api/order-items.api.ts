import { API_URL } from "../../constants/API_URL";
import type {
  OrderItemProps,
  OrderItemResponse,
} from "../../types/api/OrderItemResponse";
import axiosInstance from "../axios";

export const orderItemsApi = {
  getAll: async () => {
    const response = await axiosInstance.get<OrderItemResponse<OrderItemProps>>(
      API_URL.ORDER_ITEMS
    );
    return response.data;
  },
  getById: async (id: number | string) => {
    const response = await axiosInstance.get<OrderItemResponse<OrderItemProps>>(
      `${API_URL.ORDER_ITEMS}/${id}`
    );
    return response.data;
  },
  create: async (payload: OrderItemProps) => {
    const response = await axiosInstance.post<
      OrderItemResponse<OrderItemProps>
    >(API_URL.ORDER_ITEMS, payload);
    return response.data;
  },
  update: async (id: number | string, payload: Partial<OrderItemProps>) => {
    const response = await axiosInstance.put<
      OrderItemResponse<OrderItemProps>
    >(`${API_URL.ORDER_ITEMS}/${id}`, payload);
    return response.data;
  },
  delete: async (id: number | string) => {
    const response = await axiosInstance.delete<
      OrderItemResponse<OrderItemProps>
    >(`${API_URL.ORDER_ITEMS}/${id}`);
    return response.data;
  },
};
