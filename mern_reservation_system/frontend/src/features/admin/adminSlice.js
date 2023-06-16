import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const admin = Cookies.get("admin_access_token");

const initialState = {
  admin: admin ? admin : null,
  isErrorAdmin: false,
  isSuccessAdmin: false,
  isLoadingAdmin: false,
  messageAdmin: "",
};

//LOGIN ADMIN
export const login_admin = createAsyncThunk(
  "admin/login",
  async (userData, thunkAPI) => {
    try {
      return await adminService.login_admin(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout_admin = createAsyncThunk("admin/logout", async () => {
  return await adminService.logout_admin();
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isErrorAdmin = false;
      state.isLoadingAdmin = false;
      state.isSuccessAdmin = false;
      state.messageAdmin = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login_admin.pending, (state) => {
        state.isLoadingAdmin = true;
      })
      .addCase(login_admin.fulfilled, (state, action) => {
        state.isSuccessAdmin = true;
        state.isLoadingAdmin = false;
        state.admin = action.payload;
      })
      .addCase(login_admin.rejected, (state, action) => {
        state.isLoadingAdmin = false;
        state.isErrorAdmin = true;
        state.messageAdmin = action.payload;
        state.admin = null;
      })
      .addCase(logout_admin.fulfilled, (state, action) => {
        state.admin = null;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
