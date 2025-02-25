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
                method: 'GET'
            })
        }),

        getOrdersByUserId: builder.query({
            query: (email) => ({
                url: `/orders/${email}`,
                method: 'GET',

            })
        }),

        updateOrder: builder.mutation({
            query: (data) => {
                console.log(data)
                return {
                    url: `/orders/${data.orderId}`,
                    method: 'PUT',
                    body: { status: data?.status }
                }
            }
        }),
        deleteOrder: builder.mutation({
            query: (orderId) => {
                console.log(orderId)
                return {
                    url: `/orders/${orderId}`,
                    method: 'DELETE',
                }
            }
        }),
        verifyPayment: builder.query({
            query: (order_id) => ({
                url: '/orders/verify-payment',
                params: { order_id },
                method: 'POST',

            })
        })
    })
})


export const {
    useCreateOrderMutation,
    useVerifyPaymentQuery,
    useGetOrdersQuery,
    useGetOrdersByUserIdQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderManagementApi;