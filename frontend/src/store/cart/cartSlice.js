import { createSlice } from "@reduxjs/toolkit";
const cart = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    setCartItems: (state, action) => {
      var itemIndex;
      const doubleItem = state.cartItems.find((item, index) => {
        if (item._id === action.payload._id) {
          itemIndex = index;
          return item;
        }
        return false;
      });
      if (!doubleItem) {
        action.payload.count = 1;
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[itemIndex].count++;
      }
    },
    deleteCartItem: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
    changeNumberOfItems: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        if (action.payload.plusOrMinus === "increase") {
          item.count++;
        } else if (
          action.payload.plusOrMinus === "decrease" &&
          item.count > 1
        ) {
          item.count--;
        }
      }
    },
  },
});
export const { setCartItems, deleteCartItem, deleteCart, changeNumberOfItems } =
  cartSlice.actions;
export default cartSlice.reducer;
