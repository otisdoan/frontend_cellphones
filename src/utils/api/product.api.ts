import { API_URL } from "../../constants/API_URL";
import type {
  ProductProps,
  ProductResponse,
  ProductSelect,
} from "../../types/api/ProductResponse";
import axiosInstance from "../axios";

export const productApi = {
  getAll: async () => {
    const response = await axiosInstance.get<ProductResponse<ProductProps>>(
      API_URL.PRODUCT
    );
    return response.data;
  },
  create: async (payload: ProductProps) => {
    const response = await axiosInstance.post<ProductResponse<ProductProps>>(
      API_URL.PRODUCT,
      payload
    );
    return response.data;
  },
  getAllName: async () => {
    const repsonse = await axiosInstance.get<ProductResponse<ProductSelect>>(
      API_URL.OTHER_PRODUCT.GET_ALL_NAME
    );
    return repsonse.data;
  },
};
