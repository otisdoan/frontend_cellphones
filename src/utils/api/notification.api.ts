import axiosInstance from "../axios";
import { API_URL } from "../../constants/API_URL";

export interface NotificationProps {
  id: number;
  user_id: number;
  type: "order" | "promotion" | "system" | "smember";
  title: string;
  message?: string;
  order_id?: number;
  order_number?: string;
  is_read: boolean;
  icon_type?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface NotificationResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const notificationApi = {
  getAll: async (userId?: number, type?: string) => {
    const params = type ? { type } : {};
    const url = userId ? `${API_URL.NOTIFICATION}/user/${userId}` : API_URL.NOTIFICATION;
    const response = await axiosInstance.get<
      NotificationResponse<NotificationProps[]>
    >(url, { params });
    return response.data;
  },

  getUnreadCount: async (userId: number) => {
    const response = await axiosInstance.get<
      NotificationResponse<{ count: number }>
    >(`${API_URL.NOTIFICATION}/user/${userId}/unread-count`);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get<
      NotificationResponse<NotificationProps>
    >(`${API_URL.NOTIFICATION}/${id}`);
    return response.data;
  },

  create: async (payload: NotificationProps) => {
    const response = await axiosInstance.post<
      NotificationResponse<NotificationProps>
    >(API_URL.NOTIFICATION, payload);
    return response.data;
  },

  update: async (id: number, payload: Partial<NotificationProps>) => {
    const response = await axiosInstance.put<
      NotificationResponse<NotificationProps>
    >(`${API_URL.NOTIFICATION}/${id}`, payload);
    return response.data;
  },

  markAsRead: async (id: number) => {
    const response = await axiosInstance.patch<
      NotificationResponse<NotificationProps>
    >(`${API_URL.NOTIFICATION}/${id}/read`);
    return response.data;
  },

  markAllAsRead: async (userId: number) => {
    const response = await axiosInstance.patch<NotificationResponse<void>>(
      `${API_URL.NOTIFICATION}/user/${userId}/read-all`
    );
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axiosInstance.delete<NotificationResponse<void>>(
      `${API_URL.NOTIFICATION}/${id}`
    );
    return response.data;
  },
};
