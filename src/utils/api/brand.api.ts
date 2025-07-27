import { API_URL } from "../../constants/API_URL";
import type { BrandResponse } from "../../types/api/BrandResponse";
import axiosInstance from "../axios";

export const brandApi = {
  getAll: async () => {
    const response = await axiosInstance.get<BrandResponse>(API_URL.BRAND);
    return response.data;
  },
};
