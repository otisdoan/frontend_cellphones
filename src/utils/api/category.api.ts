import { API_URL } from "../../constants/API_URL";
import type {
  CategoryProps,
  CategoryResponse,
  CategoryTree,
} from "../../types/api/CategoryResponse";
import axiosInstance from "../axios";

export const categoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get<CategoryResponse<CategoryProps>>(
      API_URL.CATEGORY
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
  getAllNameCategories: async () => {
    const response = await axiosInstance.get<CategoryResponse<CategoryTree>>(
      API_URL.OTHER_CATEGORY.GET_ALL_NAME
    );
    return response.data;
  },
};
