import type { ProductVatiantProp } from "../../types/api/ProductVariantReponse";

export type CartState = Omit<
  ProductVatiantProp,
  "id" | "createdAt" | "updatedAt"
>;
