import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/product/cartSlice";

export const store = configureStore({
  reducer: {
    product: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
