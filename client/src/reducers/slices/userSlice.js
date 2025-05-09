import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    user: null,
    isLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload?._id;
      state.isLogin = !!action.payload && !!Object.keys(action.payload).length;
    },
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.isLogin = false;
    },
  },
});

export const { setUserId, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
