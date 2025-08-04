export interface MenuSmartphoneType {
  title: string;
  content: { name: string }[];
}

export interface MenuSmartphoneResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[];
}
