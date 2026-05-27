import { API_URL } from "../../constants/API_URL";
import type {
  ProductReviewProps,
  ProductReviewResponse,
} from "../../types/api/ProductReviewResponse";
import axiosInstance from "../axios";

export const productReviewApi = {
  getAll: async () => {
    const response = await axiosInstance.get<
      ProductReviewResponse<ProductReviewProps>
    >(API_URL.PRODUCT_REVIEW);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<
      ProductReviewResponse<ProductReviewProps>
    >(`${API_URL.PRODUCT_REVIEW}/${id}`);
    return response.data;
  },
  create: async (payload: Partial<ProductReviewProps>) => {
    const response = await axiosInstance.post<
      ProductReviewResponse<ProductReviewProps>
    >(API_URL.PRODUCT_REVIEW, payload);
    return response.data;
  },
  update: async (id: number, payload: Partial<ProductReviewProps>) => {
    const response = await axiosInstance.put<
      ProductReviewResponse<ProductReviewProps>
    >(`${API_URL.PRODUCT_REVIEW}/${id}`, payload);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<
      ProductReviewResponse<ProductReviewProps>
    >(`${API_URL.PRODUCT_REVIEW}/${id}`);
    return response.data;
  },
};
