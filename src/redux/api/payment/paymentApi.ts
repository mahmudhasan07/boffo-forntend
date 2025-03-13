import baseApi from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        makePayment: build.mutation({
            query: (data) => ({
                url: "/payment",
                method: "POST",
                body: data
            })
        }),
        cashPayment: build.mutation({
            query: (data) => ({
                url: "/payment/success",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useMakePaymentMutation, useCashPaymentMutation } = paymentApi