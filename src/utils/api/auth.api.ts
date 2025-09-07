import { API_URL } from "../../constants/API_URL";
import type { LoginResponse } from "../../types/api/LoginResponse";
import type { RegisterResponse } from "../../types/api/RegisterResponse";
import type { UserProps } from "../../types/api/UserResponse";

import type {
  LoginFormType,
  RegisterFormType,
} from "../../types/forms/formType";
import axiosInstance from "../axios";

export const authApi = {
  login: async (payload: LoginFormType) => {
    const response = await axiosInstance.post<LoginResponse<UserProps>>(
      API_URL.LOGIN,
      payload,
      { withCredentials: true }
    );
    return response.data;
  },
  register: async (payload: RegisterFormType) => {
    const response = await axiosInstance.post<RegisterResponse>(
      API_URL.REGISTER,
      payload
    );
    return response.data;
  },
  loginByGoogle: async (token: string | undefined) => {
    const response = await axiosInstance.post<LoginResponse<UserProps>>(
      API_URL.GOOGLE,
      {
        token,
      },
      { withCredentials: true }
    );
    return response.data;
  },
};
