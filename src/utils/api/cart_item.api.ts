import { API_URL } from "../../constants/API_URL";
import type {
  CartItemProps,
  CartItemResponse,
} from "../../types/api/CartItemResponse";
import axiosInstance from "../axios";

export const cartItemApi = {
  getAll: async () => {
    const response = await axiosInstance.get<CartItemResponse<CartItemProps>>(
      API_URL.CART_ITEM
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<CartItemResponse<CartItemProps>>(
      `${API_URL.CART_ITEM}/${id}`
    );
    return response.data;
  },
  create: async ({
    product_id,
    variant_id,
    quantity,
    user_id,
  }: Partial<CartItemProps>) => {
    const response = await axiosInstance.post<CartItemResponse<CartItemProps>>(
      API_URL.CART_ITEM,
      { product_id, variant_id, quantity, user_id }
    );
    return response.data;
  },
  update: async (id: string, payload: Partial<CartItemProps>) => {
    const response = await axiosInstance.patch<CartItemResponse<CartItemProps>>(
      `${API_URL.CART_ITEM}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await axiosInstance.delete<
      CartItemResponse<CartItemProps>
    >(`${API_URL.CART_ITEM}/${id}`);
    return response.data;
  },
};
