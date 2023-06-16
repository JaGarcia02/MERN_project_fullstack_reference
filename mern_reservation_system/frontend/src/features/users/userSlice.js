import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const user = Cookies.get("user_access_token");

const initialState = {
  user: user ? user : null,
  isErrorUser: false,
  isSuccessUser: false,
  isLoadingUser: false,
  messageUser: "",
};

export const register_user = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register_user(userData);
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

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login_user(userData);
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

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await userService.logout_user();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isErrorUser = false;
      state.isLoadingUser = false;
      state.isSuccessUser = false;
      state.messageUser = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register_user.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(register_user.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
      })
      .addCase(register_user.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.isErrorUser = true;
        state.messageUser = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.isErrorUser = true;
        state.messageUser = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
