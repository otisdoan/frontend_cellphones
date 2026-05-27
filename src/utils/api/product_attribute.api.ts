import { API_URL } from "../../constants/API_URL";
import type {
  ProductAttributeResponse,
  ProductAttributeProps,
} from "../../types/api/ProductAttributeResponse";
import axiosInstance from "../axios";

export const productAttributeApi = {
  getAll: async () => {
    const response = await axiosInstance.get<
      ProductAttributeResponse<ProductAttributeProps>
    >(API_URL.PRODUCT_ATTRIBUTE);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<
      ProductAttributeResponse<ProductAttributeProps>
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}`);
    return response.data;
  },
  create: async (payload: ProductAttributeProps) => {
    const response = await axiosInstance.post<
      ProductAttributeResponse<ProductAttributeProps>
    >(API_URL.PRODUCT_ATTRIBUTE, payload);
    return response.data;
  },
  update: async (
    id: number,
    payload: ProductAttributeProps
  ) => {
    const response = await axiosInstance.put<
      ProductAttributeResponse<ProductAttributeProps>
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}`, payload);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<
      ProductAttributeResponse<ProductAttributeProps>
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}`);
    return response.data;
  },
};
