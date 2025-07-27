import { API_URL } from "../../constants/API_URL";
import type { CategoryResponse } from "../../types/api/CategoryResponse";
import axiosInstance from "../axios";

export const categoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get<CategoryResponse>(
      API_URL.CATEGORY
    );
    return response.data;
  },
};
