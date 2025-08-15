import { API_URL } from "../../constants/API_URL";
import type {
  BrandProps,
  BrandResponse,
  BrandSelect,
} from "../../types/api/BrandResponse";
import axiosInstance from "../axios";

export const brandApi = {
  getAll: async () => {
    const response = await axiosInstance.get<BrandResponse<BrandProps>>(
      API_URL.BRAND
    );
    return response.data;
  },
  create: async (payload: BrandProps) => {
    const response = await axiosInstance.post<BrandResponse<BrandProps>>(
      API_URL.BRAND,
      payload
    );
    return response.data;
  },
  getAllNameBrand: async () => {
    const response = await axiosInstance.get<BrandResponse<BrandSelect>>(
      API_URL.OTHER_BRAND.GET_ALL_NAME
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<BrandResponse<BrandProps>>(
      `${API_URL.BRAND}/${id}/detail`
    );
    return response.data;
  },
  update: async (id: number, payload: Partial<BrandProps>) => {
    const response = await axiosInstance.patch<BrandResponse<BrandProps>>(
      `${API_URL.BRAND}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<BrandResponse<BrandProps>>(
      `${API_URL.BRAND}/${id}`
    );
    return response.data;
  },
};
