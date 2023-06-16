import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
  },
});
