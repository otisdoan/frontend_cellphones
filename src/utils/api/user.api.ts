import { API_URL } from "../../constants/API_URL";
import type { UserProps, UserResponse } from "../../types/api/UserResponse";
import axiosInstance from "../axios";

export const userApi = {
  getAll: async () => {
    const response = await axiosInstance.get<UserResponse<UserProps>>(
      API_URL.USER
    );
    return response.data;
  },
  getById: async (id: number | string) => {
    const response = await axiosInstance.get<UserResponse<UserProps>>(
      `${API_URL.USER}/${id}`
    );
    return response.data;
  },
  create: async (payload: UserProps) => {
    const response = await axiosInstance.post<UserResponse<UserProps>>(
      API_URL.USER,
      payload
    );
    return response.data;
  },
  update: async (id: number | string, payload: Partial<UserProps>) => {
    const response = await axiosInstance.put<UserResponse<UserProps>>(
      `${API_URL.USER}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number | string) => {
    const response = await axiosInstance.delete<UserResponse<UserProps>>(
      `${API_URL.USER}/${id}`
    );
    return response.data;
  },
};
