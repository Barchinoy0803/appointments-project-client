import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getBusinesses: build.query({
            query: (params) => ({
                method: "GET",
                url: `/admin/business/`,
                params
            }),
            providesTags: ['BUSINESS']
        }),
        getOneBusinesses: build.query({
            query: (id) => ({
                method: "GET",
                url: `/admin/business/${id}`,
            }),
            providesTags: ['BUSINESS']
        })
    }),
    overrideExisting: false
})

export const { useGetBusinessesQuery, useGetOneBusinessesQuery } = extendedApi;
