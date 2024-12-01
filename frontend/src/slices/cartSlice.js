import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItem: [] };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existedItem = state.cartItem.find((x) => x._id === item._id);

      if (existedItem) {
        state.cartItem = state.cartItem.map((x) => (x._id === existedItem._id ? existedItem.qty + 1 : x));
      } else {
        state.cartItem = [...state.cartItem, item];
      }

      //   calculate items price
      state.itemPrice = addDecimal(state.cartItem.reducer((acc, item) => acc + item.price * item.qty, 0));
      //   calculate shipping price (if oder over 100 then free else it will be 10 shipping)
      state.shippingPrice = addDecimal(state.itemPrice > 10 ? 0 : 10);
      // calculate tax price
      state.taxPrice = addDecimal(Number(0.12 * state.itemPrice).toFixed(2));
      // total price
      state.totalPrice = (Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
