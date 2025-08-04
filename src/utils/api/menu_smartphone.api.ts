import { API_URL } from "../../constants/API_URL";
import type {
  MenuSmartphoneResponse,
  MenuSmartphoneType,
} from "../../types/api/MenuSmartphoneResponse";
import axiosInstance from "../axios";

export const menuSmartphoneApi = {
  get: async () => {
    const response = await axiosInstance.get<
      MenuSmartphoneResponse<MenuSmartphoneType>
    >(API_URL.MENU_SMARTPHONE);
    return response.data;
  },
  getLatop: async () => {
    const response = await axiosInstance.get<
      MenuSmartphoneResponse<MenuSmartphoneType>
    >(API_URL.MENU_LAPTOP);
    return response.data;
  },
};
