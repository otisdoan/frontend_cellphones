import { API_URL } from "../../constants/API_URL";
import type {
  PaymentProps,
  PaymentResponse,
} from "../../types/api/PaymentResponse";

import axiosInstance from "../axios";

export const paymentApi = {
  checkout: async (payload: PaymentProps) => {
    const response = await axiosInstance.post<PaymentResponse>(
      API_URL.PAYMENT,
      payload
    );
    return response.data;
  },
};
