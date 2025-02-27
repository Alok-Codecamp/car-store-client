import { baseApi } from "../../api/baseApi";

// type TRole = "user" | "admin";

export interface TUser {
    name?: string;
    email?: string;
    password?: string;
    address?: string;

}

type TUpdateUserByEmail = {
    data: TUser;
    email: string
}


const accountManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        myAccount: builder.query({
            query: (email) => ({
                url: `/users/${email}`,
                method: 'GET',
            })

        }),
        updateMyAccount: builder.mutation({
            query: (args: TUpdateUserByEmail) => ({
                url: `/users/${args.email}`,
                method: 'PUT',
                body: args.data
            })
        }),
        changeAccountPassword: builder.mutation({
            query: (args: { email: string, data: { oldPassword: string, newPassword: string } }) => ({


                url: `/users/change-password/${args.email}`,
                method: 'PUT',
                body: args.data

            })
        }),
    })
})


export const { useMyAccountQuery, useUpdateMyAccountMutation, useChangeAccountPasswordMutation } = accountManagementApi;