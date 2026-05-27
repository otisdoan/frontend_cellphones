import { API_URL } from "../../constants/API_URL";
import type {
  ProductProps,
  ProductResponse,
} from "../../types/api/ProductResponse";
import axiosInstance from "../axios";

export const productApi = {
  getAll: async () => {
    const response = await axiosInstance.get<ProductResponse<ProductProps>>(
      API_URL.PRODUCT
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<ProductResponse<ProductProps>>(
      `${API_URL.PRODUCT}/${id}`
    );
    return response.data;
  },
  getProductBySlug: async (slug: string) => {
    const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
    const response = await axiosInstance.get<ProductResponse<ProductProps>>(
      `${API_URL.PRODUCT}/slug/${cleanSlug}`
    );
    return response.data;
  },
  create: async (payload: ProductProps) => {
    const response = await axiosInstance.post<ProductResponse<ProductProps>>(
      API_URL.PRODUCT,
      payload
    );
    return response.data;
  },
  update: async (id: number, payload: ProductProps) => {
    const response = await axiosInstance.put<ProductResponse<ProductProps>>(
      `${API_URL.PRODUCT}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<ProductResponse<ProductProps>>(
      `${API_URL.PRODUCT}/${id}`
    );
    return response.data;
  },
};
