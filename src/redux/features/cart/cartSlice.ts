import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartType";
import type { CartItemProps } from "../../../types/api/CartItemResponse";
import { cartItemApi } from "../../../utils/api/cart_item.api";
import { productVariantApi } from "../../../utils/api/product_variant.api";
import type { ProductVatiantProp } from "../../../types/api/ProductVariantReponse";

const initialState: CartState = {
  items: [],
  totalCart: 0,
  cartItem: [],
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  return await cartItemApi.getAll();
});

export const fetchCartById = createAsyncThunk(
  "cart/fetchCartById",
  async (id: number) => {
    const ids: number[] = [];
    let totalCart: number = 0;
    let cartItem: ProductVatiantProp[] = [];
    const result = await cartItemApi.getById(id);
    if (Array.isArray(result.data)) {
      totalCart = result.data.length;
      result.data.forEach((item) => {
        ids.push(Number(item.variant_id));
      });
    }
    if (ids.length > 0) {
      const variant = await productVariantApi.getVariantByIds(ids);
      if (Array.isArray(variant.data)) {
        cartItem = variant.data;
      }
    }
    return {
      totalCart,
      cartItem,
    };
  }
);
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({
    product_id,
    variant_id,
    quantity,
    user_id,
  }: Partial<CartItemProps>) => {
    return await cartItemApi.create({
      product_id,
      variant_id,
      quantity,
      user_id,
    });
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.data;
    });
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      state.totalCart = action.payload.totalCart;
      state.cartItem = action.payload.cartItem;
    });
  },
});

export default cartSlice.reducer;
