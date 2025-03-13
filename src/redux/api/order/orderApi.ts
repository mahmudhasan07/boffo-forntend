import baseApi from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch orders for the logged-in user
    getMyOrders: builder.query({
      query: () => ({
        url: "/order/my-orders",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyOrdersQuery } = orderApi;
