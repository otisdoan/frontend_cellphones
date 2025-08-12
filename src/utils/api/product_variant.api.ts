import { API_URL } from "../../constants/API_URL";
import type {
  ProductVariantCapacity,
  ProductVariantResponse,
  ProductVatiantProp,
} from "../../types/api/ProductVariantReponse";
import axiosInstance from "../axios";

export const productVariantApi = {
  getById: async (id: number | undefined) => {
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/${id}`);
    return response.data;
  },

  getCapacity: async (id_product: number | undefined) => {
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVariantCapacity>
    >(`${API_URL.PRODUCT_CAPACITY}/${id_product}`);
    return response.data;
  },

  getVariantByCapacity: async (capacity: string | undefined) => {
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_CAPACITY}/${capacity}`);
    return response.data;
  },

  getVariantById: async (id: number) => {
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/${id}`);
    return response.data;
  },
};
