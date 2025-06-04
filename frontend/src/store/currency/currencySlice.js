import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  initialState: {
    currency: localStorage.getItem("currency") || "KM",
    symbol: "",
  },
  name: "currency",
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});
export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
