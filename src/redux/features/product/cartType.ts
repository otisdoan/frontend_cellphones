import type { ProductVatiantProp } from "../../../types/api/ProductVariantReponse";

export type CartItem = Omit<
  ProductVatiantProp,
  "id" | "createdAt" | "updatedAt"
>;

export interface CartState {
  items: CartItem[];
}
