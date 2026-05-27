export interface CouponProps {
  id: number;
  code: string;
  name: string;
  description: string;
  type: string;
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount?: number;
  userUsageLimit?: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

export interface CouponResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}
