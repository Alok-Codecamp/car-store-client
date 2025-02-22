import { baseApi } from "../../../api/baseApi";




const orderManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders/create-order',
                method: 'POST',
                body: data
            })
        }),
        getOrders: builder.query({
            query: () => ({
                url: '/orders',
                method: 'GET',
            })
        }),
        verifyPayment: builder.query({
            query: (order_id) => ({
                url: '/orders/verify-payment',
                params: { order_id },
                method: 'GET',

            })
        })
    })
})


export const { useCreateOrderMutation, useGetOrdersQuery, useVerifyPaymentQuery } = orderManagementApi;