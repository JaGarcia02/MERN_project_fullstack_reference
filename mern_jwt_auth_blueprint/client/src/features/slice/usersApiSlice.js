import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

// this will be injected to apiSclice (dependencies injections)
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login //
    login: builder.mutation({
      // this will bridge the frontend to the backend
      query: (data) => ({
        url: `${USERS_URL}/auth`, // put your url that you set in the backend ("USER_URL = /api/users")
        method: "POST",
        body: data,
      }),
    }),
    // Register //
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    // Logout //
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    // Update //
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateMutation,
} = usersApiSlice;
