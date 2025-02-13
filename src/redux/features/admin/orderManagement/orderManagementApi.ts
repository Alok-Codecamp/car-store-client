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
        })
    })
})


export const { useCreateOrderMutation, useGetOrdersQuery } = orderManagementApi;