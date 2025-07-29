import { API_URL } from "../../constants/API_URL";
import type {
  AllCategoryType,
  CategoryProps,
  CategoryResponse,
} from "../../types/api/CategoryResponse";
import axiosInstance from "../axios";

export const categoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get<CategoryResponse>(
      API_URL.CATEGORY
    );
    return response.data;
  },
  create: async (payload: CategoryProps) => {
    const response = await axiosInstance.post<CategoryResponse>(
      API_URL.CATEGORY,
      payload
    );
    return response.data;
  },
  getAllCategories: async () => {
    const response = await axiosInstance.get<AllCategoryType>(
      API_URL.OTHER_CATEGORY.GET_ALL_NAME
    );
    return response.data;
  },
};
