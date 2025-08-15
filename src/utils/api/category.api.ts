import { API_URL } from "../../constants/API_URL";
import type {
  CategoryMobile,
  CategoryProps,
  CategoryResponse,
  CategoryTabletMobile,
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
  getById: async (id: number) => {
    const response = await axiosInstance.get<CategoryResponse<CategoryProps>>(
      `${API_URL.CATEGORY}/${id}/detail`
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
  getCategoryMobile: async () => {
    const response = await axiosInstance.get<CategoryResponse<CategoryMobile>>(
      API_URL.OTHER_CATEGORY.CATEGORY_MOBILE
    );
    return response.data;
  },
  getCategoryTabletMobile: async () => {
    const response = await axiosInstance.get<
      CategoryResponse<CategoryTabletMobile>
    >(API_URL.OTHER_CATEGORY.CATEGORY_TABLET_MOBILE);
    return response.data;
  },
  updateCategory: async (id: number, payload: CategoryProps) => {
    const response = await axiosInstance.patch<
      CategoryResponse<CategoryTabletMobile>
    >(`${API_URL.CATEGORY}/${id}`, payload);
    return response.data;
  },
  deleteCategory: async (id: number) => {
    const response = await axiosInstance.delete<
      CategoryResponse<CategoryProps>
    >(`${API_URL.CATEGORY}/${id}`);
    return response.data;
  },
};
