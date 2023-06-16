import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// this will create a slice to store in the localStorage
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // This will store userInfo to the localStorage
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // the payload set in the middleware will be stored in the localStorage
    },
    // This will remove userInfo from the localStorage
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
