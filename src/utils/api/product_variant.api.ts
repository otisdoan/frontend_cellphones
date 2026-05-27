import { API_URL } from "../../constants/API_URL";
import type {
  ProductVariantResponse,
  ProductVatiantProp,
  ProductVariantCapacity,
  ProductVariantCapacityResponse,
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
    >(`${API_URL.PRODUCT_VARIANT_BY_ID}/${id}`);
    return response.data;
  },

  create: async (payload: ProductVatiantProp) => {
    const response = await axiosInstance.post<
      ProductVariantResponse<ProductVatiantProp>
    >(API_URL.PRODUCT_VARIANT_BY_ID, payload);
    return response.data;
  },

  update: async (id: number, payload: ProductVatiantProp) => {
    const response = await axiosInstance.put<
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

  getCapacity: async (
    groupName: string
  ): Promise<ProductVariantResponse<ProductVariantCapacity>> => {
    const response = await axiosInstance.get<{
      code?: number;
      status?: string;
      message: string;
      data: ProductVariantCapacityResponse;
    }>(`${API_URL.PRODUCT_CAPACITY}/${groupName}`);

    const mappedData = response.data.data.capacity.map((cap) => ({
      capacity: cap,
    }));

    return {
      status: response.data.status || (response.data.code === 1000 ? "success" : "error"),
      message: response.data.message,
      data: mappedData,
    };
  },

  getVariantByCapacity: async (
    capacity: string,
    groupName: string
  ): Promise<ProductVariantResponse<ProductVatiantProp>> => {
    const response = await axiosInstance.get<{
      code?: number;
      status?: string;
      message: string;
      data: ProductVatiantProp[];
    }>(API_URL.PRODUCT_VARIANT_BY_CAPACITY, {
      params: {
        capacity,
        group_name: groupName,
      },
    });

    return {
      status: response.data.status || (response.data.code === 1000 ? "success" : "error"),
      message: response.data.message,
      data: response.data.data,
    };
  },

  getVariantById: async (id: number) => {
    return productVariantApi.getById(id);
  },

  getVariantByIds: async (
    ids: number[]
  ): Promise<ProductVariantResponse<ProductVatiantProp>> => {
    const results = await Promise.all(
      ids.map((id) => productVariantApi.getById(id))
    );

    const variants = results.map((r) => r.data as ProductVatiantProp);

    return {
      status: "success",
      message: "Get variants by ids successfully",
      data: variants,
    };
  },
};
