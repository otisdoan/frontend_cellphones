import { API_URL } from "../../constants/API_URL";
import type {
  CategoryProps,
  CategoryResponse,
} from "../../types/api/CategoryResponse";
import axiosInstance from "../axios";

export const categoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get<CategoryResponse<CategoryProps>>(
      API_URL.CATEGORY
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<CategoryResponse<CategoryProps>>(
      `${API_URL.CATEGORY}/${id}`
    );
    return response.data;
  },
  create: async (payload: CategoryProps) => {
    const response = await axiosInstance.post<CategoryResponse<CategoryProps>>(
      API_URL.CATEGORY,
      payload
    );
    return response.data;
  },
  update: async (id: number, payload: CategoryProps) => {
    const response = await axiosInstance.put<CategoryResponse<CategoryProps>>(
      `${API_URL.CATEGORY}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<CategoryResponse<CategoryProps>>(
      `${API_URL.CATEGORY}/${id}`
    );
    return response.data;
  },
};
