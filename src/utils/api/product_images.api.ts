import { API_URL } from "../../constants/API_URL";
import type {
  ProductImageResponse,
  ProductImagesProp,
} from "../../types/api/ProductImageResponse";
import axiosInstance from "../axios";

export const productImgaesApi = {
  getAll: async () => {
    const response = await axiosInstance.get<
      ProductImageResponse<ProductImagesProp>
    >(API_URL.PRODUCT_IMAGES);
    return response.data;
  },
  create: async (paylaod: ProductImagesProp) => {
    const response = await axiosInstance.post<
      ProductImageResponse<ProductImagesProp>
    >(API_URL.PRODUCT_IMAGES, paylaod);
    return response.data;
  },
};
