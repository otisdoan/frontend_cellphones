import { API_URL } from "../../constants/API_URL";
import type {
  LoginFormType,
  RegisterFormType,
} from "../../types/forms/formType";
import axiosInstance from "../axios";

export const authApi = {
  login: async (payload: LoginFormType) => {
    const response = await axiosInstance.post(API_URL.LOGIN, payload);
    return response.data;
  },
  register: async (payload: RegisterFormType) => {
    const response = await axiosInstance.post(API_URL.REGISTER, payload);
    return response.data;
  },
};
