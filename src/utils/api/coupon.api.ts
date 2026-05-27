import { API_URL } from "../../constants/API_URL";
import type {
  CouponProps,
  CouponResponse,
} from "../../types/api/CouponResponse";
import axiosInstance from "../axios";

export const couponApi = {
  getAll: async () => {
    const response = await axiosInstance.get<CouponResponse<CouponProps>>(
      API_URL.COUPON
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<CouponResponse<CouponProps>>(
      `${API_URL.COUPON}/${id}`
    );
    return response.data;
  },
  create: async (payload: Partial<CouponProps>) => {
    const response = await axiosInstance.post<CouponResponse<CouponProps>>(
      API_URL.COUPON,
      payload
    );
    return response.data;
  },
  update: async (id: number, payload: Partial<CouponProps>) => {
    const response = await axiosInstance.put<CouponResponse<CouponProps>>(
      `${API_URL.COUPON}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<CouponResponse<CouponProps>>(
      `${API_URL.COUPON}/${id}`
    );
    return response.data;
  },
};
