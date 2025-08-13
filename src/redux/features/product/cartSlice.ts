import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartType";
import type { CartItemProps } from "../../../types/api/CartItemResponse";
import { cartItemApi } from "../../../utils/api/cart_item.api";

const initialState: CartState = {
  items: [],
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  return await cartItemApi.getAll();
});

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
  },
});

export default cartSlice.reducer;
