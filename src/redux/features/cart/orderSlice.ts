/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { ProductVatiantProp } from "../../../types/api/ProductVariantReponse";

interface OrderState {
  items: ProductVatiantProp[];
  address: any;
}

const initialState: OrderState = {
  items: [],
  address: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("orderItems", JSON.stringify(action.payload));
    },
    getOrderItems: (state) => {
      const orderItems = localStorage.getItem("orderItems");
      if (orderItems) {
        state.items = JSON.parse(orderItems);
      }
    },
    setOrderAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("orderAddress", JSON.stringify(action.payload));
    },
    getOrderAddress: (state) => {
      const orderAddress = localStorage.getItem("orderAddress");
      if (orderAddress) {
        state.address = JSON.parse(orderAddress);
      }
    },
  },
});

export const {
  setOrderItems,
  getOrderItems,
  setOrderAddress,
  getOrderAddress,
} = orderSlice.actions;
export default orderSlice.reducer;
