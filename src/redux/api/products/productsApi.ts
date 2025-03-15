import baseApi from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all products with query parameters
    getProducts: builder.query({
      query: ({ gender, category, isFeature, search }) => {
        const params = new URLSearchParams();
    
        if (category) params.append("category", category);
        if (gender) params.append("gender", gender);
        if (isFeature) params.append("isFeature", isFeature);
        if (search) params.append("search", search);
    
        return {
          url: `/product?${params.toString()}`,
          method: "GET",
        };
      },
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
