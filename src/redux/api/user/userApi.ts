import baseApi from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup
    signup: builder.mutation({
      query: (userData) => ({
        url: "/user/create",
        method: "POST",
        body: userData,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // OTP Verification
    verifyOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/user/verifyOTP?email=${email}`,
        method: "POST",
        body: { otp },
      }),
    }),

    // Forget Password
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useForgetPasswordMutation,
} = authApi;
