import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartType";

const initialState: CartState = {
  value: "",
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (payload) => {
      payload.value += 1;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
