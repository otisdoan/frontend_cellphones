export interface PaymentProps {
  orderCode: number;
  amount: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  checkoutUrl?: string;
  qrCode?: string;
}

export interface PaymentResponse {
  checkoutUrl?: string;
  qrCode?: string;
}
