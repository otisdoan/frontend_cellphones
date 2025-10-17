import { createSlice } from "@reduxjs/toolkit";
import type { ProductVatiantProp } from "../../../types/api/ProductVariantReponse";

interface OrderState {
  items: ProductVatiantProp[];
}

const initialState: OrderState = {
  items: [],
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
  },
});

export const { setOrderItems, getOrderItems } = orderSlice.actions;
export default orderSlice.reducer;
