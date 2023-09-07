import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  getToLocalStorage,
  removeToLocalStorage,
  setToLocalStorage,
} from "../utils/localStorage";

const initialState = {
  cartItem: getToLocalStorage("cart") === null ? [] : getToLocalStorage("cart"),
  totalPrice:
    getToLocalStorage("totalPrice") === null
      ? 0
      : getToLocalStorage("totalPrice"),
  cartLength:
    getToLocalStorage("cartNumber") === null
      ? 0
      : getToLocalStorage("cartNumber"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const index = state.cartItem.findIndex(({ _id }) => payload._id === _id);
      if (index > -1) {
        toast.error(`Item already in cart`);
        return;
      }
      state.cartItem.push(payload);
      state.totalPrice += payload.price;
      state.cartLength++;

      setToLocalStorage("cart", state.cartItem);
      setToLocalStorage("totalPrice", state.totalPrice);
      setToLocalStorage("cartNumber", state.cartLength);
      toast.success("Added to cart");
    },
    removeToCart: (state, { payload }) => {
      const cartIndex = state.cartItem.findIndex(({ _id }) => _id === payload);
      state.cartItem(newCartItem);
      if (cartIndex >= 0) {
        state.cartLength--;
        state.totalPrice -= state.cartItem[cartIndex].price;
        state.cartItem.slice(cartIndex, 1);

        setToLocalStorage("cart", state.cartItem);
        setToLocalStorage("totalPrice", state.totalPrice);
        setToLocalStorage("cartNumber", state.cartLength);

        toast.success("Item is removed successfully");
      } else {
        toast.error("Item not found in cart");
      }
    },
    resetCart: (state) => {
      state.cartItem = [];
      state.cartLength = 0;
      state.totalPrice = 0;
      removeToLocalStorage("cart");
      removeToLocalStorage("totalPrice");
      removeToLocalStorage("cartNumber");
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeToCart, resetCart } = cartSlice.actions;
