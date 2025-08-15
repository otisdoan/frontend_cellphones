import { API_URL } from "../../constants/API_URL";
import type {
  ProductImageResponse,
  ProductImagesProp,
} from "../../types/api/ProductImageResponse";
import axiosInstance from "../axios";

export const productImgaesApi = {
  getAll: async () => {
    const response = await axiosInstance.get<
      ProductImageResponse<ProductImagesProp>
    >(API_URL.PRODUCT_IMAGES);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<
      ProductImageResponse<ProductImagesProp>
    >(`${API_URL.PRODUCT_IMAGES}/${id}/detail`);
    return response.data;
  },
  create: async (paylaod: ProductImagesProp) => {
    const response = await axiosInstance.post<
      ProductImageResponse<ProductImagesProp>
    >(API_URL.PRODUCT_IMAGES, paylaod);
    return response.data;
  },
  update: async (id: number, payload: ProductImagesProp) => {
    const response = await axiosInstance.patch<
      ProductImageResponse<ProductImagesProp>
    >(`${API_URL.PRODUCT_IMAGES}/${id}`, payload);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<
      ProductImageResponse<ProductImagesProp>
    >(`${API_URL.PRODUCT_IMAGES}/${id}`);
    return response.data;
  },
};
