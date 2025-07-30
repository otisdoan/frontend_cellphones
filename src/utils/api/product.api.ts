import { API_URL } from "../../constants/API_URL";
import type {
  ProductProps,
  ProductResponse,
} from "../../types/api/ProductResponse";
import axiosInstance from "../axios";

export const productApi = {
  getAll: async () => {
    const response = await axiosInstance.get<ProductResponse>(API_URL.PRODUCT);
    return response.data;
  },
  create: async (payload: ProductProps) => {
    const response = await axiosInstance.post<ProductResponse>(
      API_URL.PRODUCT,
      payload
    );
    return response.data;
  },
};
