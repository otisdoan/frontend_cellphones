import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartType";

let initialState: CartState = {
  product_id: "",
  variant_name: "",
  sku: "",
  price: 0,
  sale_price: 0,
  stock_quantity: 0,
  image_url: "",
  is_active: true,
  capacity: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (payload) => {
      initialState = payload;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
