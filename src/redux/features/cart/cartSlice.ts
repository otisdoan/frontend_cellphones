import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartType";
import type { CartItemProps } from "../../../types/api/CartItemResponse";
import { cartItemApi } from "../../../utils/api/cart_item.api";
import { productVariantApi } from "../../../utils/api/product_variant.api";
import { productApi } from "../../../utils/api/product.api";
import type { ProductProps } from "../../../types/api/ProductResponse";
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
    let totalCart: number = 0;
    let cartItem: ProductVatiantProp[] = [];
    const result = await cartItemApi.getByUserId(id);

    if (Array.isArray(result.data)) {
      const cartItemsData = result.data as CartItemProps[];

      const promises = cartItemsData.map(async (cItem) => {
        try {
          if (cItem.variant_id && Number(cItem.variant_id) > 0) {
            const varResult = await productVariantApi.getById(Number(cItem.variant_id));
            if (varResult && varResult.data && !Array.isArray(varResult.data)) {
              const v = varResult.data as ProductVatiantProp;
              return {
                ...v,
                id: Number(cItem.id),
                quantity: cItem.quantity,
                checked: false,
              };
            }
          } else {
            const prodResult = await productApi.getById(Number(cItem.product_id));
            if (prodResult && prodResult.data && !Array.isArray(prodResult.data)) {
              const p = prodResult.data as ProductProps;
              return {
                id: Number(cItem.id),
                product_id: p.id.toString(),
                variant_name: p.name,
                sku: p.sku,
                price: Number(p.price),
                sale_price: Number(p.sale_price),
                stock_quantity: 999,
                image_url: (p.product_image && p.product_image.length > 0) ? p.product_image[0] : "/images/product-placeholder.webp",
                is_active: p.status === "active",
                capacity: "",
                order_id: "",
                variant_id: "",
                product_name: p.name,
                product_slug: p.slug,
                quantity: cItem.quantity,
                total: (Number(p.price) * cItem.quantity).toString(),
                checked: false,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
              } as ProductVatiantProp;
            }
          }
        } catch (error) {
          console.error("Failed to fetch details for cart item:", cItem, error);
        }
        return null;
      });

      const resolvedItems = await Promise.all(promises);
      cartItem = resolvedItems.filter((item): item is ProductVatiantProp => item !== null);
      totalCart = cartItem.length;
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
    await cartItemApi.delete(id);
    return id;
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
      const deletedId = action.payload;
      state.cartItem = state.cartItem.filter(
        (item) => Number(item.id) !== Number(deletedId)
      );
      state.totalCart -= 1;
    });
  },
});
export const { updateCheckedCartItem } = cartSlice.actions;
export default cartSlice.reducer;
