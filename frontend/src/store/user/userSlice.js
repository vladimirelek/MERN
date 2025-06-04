import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = {};
    },
  },
});
export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
