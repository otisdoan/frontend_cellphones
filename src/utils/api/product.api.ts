import { API_URL } from "../../constants/API_URL";
import type { ProductResponse } from "../../types/api/ProductResponse";
import axiosInstance from "../axios";

export const productApi = {
  getAll: async () => {
    const response = await axiosInstance.get<ProductResponse>(API_URL.PRODUCT);
    return response.data;
  },
};
