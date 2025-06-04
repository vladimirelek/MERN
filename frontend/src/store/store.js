import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency/currencySlice";
import loaderSlice from "./loader/loaderSlice";
import userSlice from "./user/userSlice";
import dashBoardSlice from "./dashboard/dashBoardSlice";
import cartSlice from "./cart/cartSlice";
import unreadSlice from "./unread/unreadSlice";

export const store = configureStore({
  reducer: {
    currencyStore: currencySlice,
    loaderStore: loaderSlice,
    userStore: userSlice,
    dashBoardStore: dashBoardSlice,
    cartStore: cartSlice,
    unreadStore: unreadSlice,
  },
});
