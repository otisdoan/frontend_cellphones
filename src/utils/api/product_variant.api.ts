import { API_URL } from "../../constants/API_URL";
import type {
  ProductVariantCapacity,
  ProductVariantResponse,
  ProductVatiantProp,
} from "../../types/api/ProductVariantReponse";
import axiosInstance from "../axios";

export const productVariantApi = {
  getAll: async () => {
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVatiantProp>
    >(API_URL.PRODUCT_VARIANT_BY_ID);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/${id}/detail`);
    return response.data;
  },

  create: async (payload: ProductVatiantProp) => {
    const response = await axiosInstance.post<
      ProductVariantResponse<ProductVatiantProp>
    >(API_URL.PRODUCT_VARIANT_BY_ID, payload);
    return response.data;
  },

  update: async (id: number, payload: ProductVatiantProp) => {
    const response = await axiosInstance.patch<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/${id}`, payload);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axiosInstance.delete<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/${id}`);
    return response.data;
  },

  getByIdOriginal: async (id: number | undefined) => {
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

  getVariantByIds: async (ids: number[]) => {
    const response = await axiosInstance.get<
      ProductVariantResponse<ProductVatiantProp>
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/many-id`, {
      params: { ids: ids.join(",") },
    });
    return response.data;
  },
};
