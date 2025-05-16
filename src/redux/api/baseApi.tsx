// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const baseApi = createApi({
  reducerPath: "baseApi", // The key for this API in the Redux store
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://api.boffo-global.com/api/v1', // Replace with your API's base URL
    baseUrl: "http://localhost:4000/api/v1",
    // credentials : "include",
    prepareHeaders: (headers) => {
      const token = Cookies?.get("token"); // Assuming token is stored in the auth slice
      if (token) {
        headers.set("Authorization", `${token}`);
        return;
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "approveEvent",
    "allEvents",
    "logIn",
    "transaction",
    "allUsers",
    "allCreators",
    "complains",
    "updateSubscription",
    "cart",
    "coupon",
  ],
});

// Export hooks for usage in functional components
export default baseApi;
