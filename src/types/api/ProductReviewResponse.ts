export interface ProductReviewProps {
  id: number;
  productId: number;
  userId: number;
  orderId?: number;
  rating: number;
  title: string;
  content: string;
  images?: string;
  isVerifiedPurchase: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  helpfulCount?: number;
}

export interface ProductReviewResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}
