import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetPasswordData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetPasswordData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
