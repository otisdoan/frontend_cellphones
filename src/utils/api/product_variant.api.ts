import { API_URL } from "../../constants/API_URL";
import type {
  ProductVariantResponse,
  ProductVatiantProp,
} from "../../types/api/ProductVariantReponse";
import axiosInstance from "../axios";

export const productVariantApi = {
  getById: async (id: number | undefined) => {
    console.log("api", id);
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/${id}`);
    return response.data;
  },
};
