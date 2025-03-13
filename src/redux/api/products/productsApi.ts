import baseApi from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all products with query parameters
    getProducts: builder.query({
      query: ({ gender, category, isFeature, search }) => ({
        url: `/product?category=${category}&gender=${gender}&isFeature=${isFeature}&search=${search}`,
        method: "GET",
      }),
    }),

    // Fetch a single product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
