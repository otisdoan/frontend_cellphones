import { API_URL } from "../../constants/API_URL";
import type {
  UserAddressProps,
  UserAddressResponse,
} from "../../types/api/UserAddressResponse";
import axiosInstance from "../axios";

export const userAddressApi = {
  getAll: async () => {
    const response = await axiosInstance.get<
      UserAddressResponse<UserAddressProps>
    >(API_URL.USER_ADDRESS);
    return response.data;
  },
  getById: async (id: number) => {
    const response = await axiosInstance.get<
      UserAddressResponse<UserAddressProps>
    >(`${API_URL.USER_ADDRESS}/${id}`);
    return response.data;
  },
  create: async (payload: Partial<UserAddressProps>) => {
    const response = await axiosInstance.post<
      UserAddressResponse<UserAddressProps>
    >(API_URL.USER_ADDRESS, payload);
    return response.data;
  },
  update: async (id: number, payload: Partial<UserAddressProps>) => {
    const response = await axiosInstance.put<
      UserAddressResponse<UserAddressProps>
    >(`${API_URL.USER_ADDRESS}/${id}`, payload);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<
      UserAddressResponse<UserAddressProps>
    >(`${API_URL.USER_ADDRESS}/${id}`);
    return response.data;
  },
};
