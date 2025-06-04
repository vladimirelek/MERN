import { createSlice } from "@reduxjs/toolkit";

const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboard: false,
  },
  reducers: {
    setDashBoard: (state, action) => {
      state.dashboard = action.payload;
    },
  },
});
export const { setDashBoard } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
