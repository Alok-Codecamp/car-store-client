import { baseApi } from "../../../api/baseApi";




const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/users/create-user',
                method: 'POST',
                body: data
            })
        }),
        getAllUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            })
        })
    })
})


export const { useRegisterUserMutation, useGetAllUserQuery } = userManagementApi;