import { API_URL } from "../../constants/API_URL";
import type {
  ProductAttributeResponse,
  ProductAttributeProps,
} from "../../types/api/ProductAttributeResponse";
import axiosInstance from "../axios";

export const productAttributeApi = {
  getByProductId: async (id: number | string | undefined) => {
    const response = await axiosInstance.get<
      ProductAttributeResponse<ProductAttributeProps>
    >(`${API_URL.PRODUCT_ATTRIBUTE}/${id}`);
    return response.data;
  },
};
