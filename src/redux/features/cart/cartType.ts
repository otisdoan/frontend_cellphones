import type { CartItemProps } from "../../../types/api/CartItemResponse";
import type { ProductVatiantProp } from "../../../types/api/ProductVariantReponse";

export interface CartState {
  items: CartItemProps[];
  totalCart: number;
  cartItem: ProductVatiantProp[];
}
