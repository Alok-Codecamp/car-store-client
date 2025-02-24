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
        }),
        changeStatus: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/${data.email}`,
                    method: 'PUT',
                    body: { status: data?.status }
                };
            }
        }),
    })
})


export const { useRegisterUserMutation, useGetAllUserQuery, useChangeStatusMutation } = userManagementApi;