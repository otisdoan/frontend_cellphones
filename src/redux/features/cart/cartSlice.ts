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
      result.data.forEach((item) => {
        ids.push(Number(item.variant_id));
      });
    }
    if (ids.length > 0) {
      const variant = await productVariantApi.getVariantByIds(ids);
      if (Array.isArray(variant.data)) {
        cartItem = variant.data.map((item) => ({ ...item, checked: false }));
        totalCart = cartItem.length;
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
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ id, quantity }: { id: string; quantity: number }) => {
    return await cartItemApi.update(id, { quantity });
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id: string) => {
    return await cartItemApi.delete(id);
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCheckedCartItem: (state, action) => {
      if (action.payload === "all") {
        state.cartItem = state.cartItem.map((item) => ({
          ...item,
          checked: !item.checked,
        }));
      } else {
        state.cartItem = state.cartItem.map((item) =>
          item.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.items = action.payload.data;
      }
    });
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      state.totalCart = action.payload.totalCart;
      state.cartItem = action.payload.cartItem;
    });
    builder.addCase(addCartItem.fulfilled, (state) => {
      state.totalCart += 1;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.cartItem = state.cartItem.map((item) => {
        if (!Array.isArray(action.payload.data)) {
          if (Number(item.id) === Number(action.payload.data.id)) {
            return { ...item, quantity: action.payload.data.quantity };
          }
          return item;
        }
        return item;
      });
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      if (!Array.isArray(action.payload.data)) {
        const deletedCart = action.payload.data as CartItemProps;
        state.cartItem = state.cartItem.filter(
          (item) => Number(item.id) !== Number(deletedCart.id)
        );
      }
      state.totalCart -= 1;
    });
  },
});
export const { updateCheckedCartItem } = cartSlice.actions;
export default cartSlice.reducer;
