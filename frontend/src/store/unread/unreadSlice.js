import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasUnread: false,
};

const unreadSlice = createSlice({
  name: "unread",
  initialState,
  reducers: {
    setUnread: (state, action) => {
      console.log("Setting unread state to:", action.payload);
      state.hasUnread = action.payload;
    },
  },
});

export const { setUnread } = unreadSlice.actions;
export default unreadSlice.reducer;
