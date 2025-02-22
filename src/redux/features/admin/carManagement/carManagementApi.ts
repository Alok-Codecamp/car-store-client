import { TQueryParam, TReduxResponse } from "../../../../types/query";
import { TResponseData } from "../../../../types/response";
import { baseApi } from "../../../api/baseApi";



const carManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCar: builder.mutation({
            query: (data) => ({
                url: '/cars/create-car',
                method: 'POST',
                body: data
            })
        }),
        getCars: builder.query({
            query: (args: TQueryParam[]) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item) => {
                        const value = item.value
                        params.append(item.name, value as string);
                    })
                }
                return {
                    url: '/cars',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TReduxResponse<TResponseData>) => {
                return response.data;
            },

        }),
        getCarById: builder.query({
            query: (carId: string) => ({
                url: `/cars/${carId}`,
                method: 'GET',
            })
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                url: `/cars/${id}`,
                method: 'DELETE',
            })
        })
    })
})


export const {
    useAddCarMutation,
    useGetCarsQuery,
    useDeleteCarMutation,
    useGetCarByIdQuery,
} = carManagementApi;