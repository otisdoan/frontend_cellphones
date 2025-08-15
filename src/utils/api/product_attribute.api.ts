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
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}/detail`);
    return response.data;
  },
  create: async (payload: ProductAttributeProps) => {
    const response = await axiosInstance.post<
      ProductAttributeResponse<ProductAttributeProps>
    >(API_URL.PRODUCT_ATTRIBUTE, payload);
    return response.data;
  },
  updateProductAttribute: async (
    id: number,
    payload: ProductAttributeProps
  ) => {
    const response = await axiosInstance.patch<
      ProductAttributeResponse<ProductAttributeProps>
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}`, payload);
    return response.data;
  },
  deleteProductAttribute: async (id: number) => {
    const response = await axiosInstance.delete<
      ProductAttributeResponse<ProductAttributeProps>
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}`);
    return response.data;
  },
  getByProductId: async (id: number | string | undefined) => {
    const response = await axiosInstance.get<
      ProductAttributeResponse<ProductAttributeProps>
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}`);
    return response.data;
  },
};
