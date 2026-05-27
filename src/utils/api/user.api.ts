import { API_URL } from "../../constants/API_URL";
import type { UserProps, UserResponse, PaginatedResponse } from "../../types/api/UserResponse";
import axiosInstance from "../axios";

export const userApi = {
  getAll: async () => {
    const response = await axiosInstance.get<
      UserResponse<PaginatedResponse<UserProps> | UserProps[]>
    >(API_URL.USER);
    return response.data;
  },
  getById: async (id?: number) => {
    const response = await axiosInstance.get<UserResponse<UserProps>>(
      `${API_URL.USER}/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await axiosInstance.get<UserResponse<UserProps>>(
      `${API_URL.USER}/me`,
      { withCredentials: true }
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
  update: async (id: number, payload: Partial<UserProps>) => {
    const response = await axiosInstance.put<UserResponse<UserProps>>(
      `${API_URL.USER}/${id}`,
      payload
    );
    return response.data;
  },
  updateUser: async (id: number, payload: Partial<UserProps>) => {
    return userApi.update(id, payload);
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete<UserResponse<UserProps>>(
      `${API_URL.USER}/${id}`
    );
    return response.data;
  },
  deleteUser: async (id: number) => {
    return userApi.delete(id);
  },
};
