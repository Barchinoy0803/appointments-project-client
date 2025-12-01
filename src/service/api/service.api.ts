import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getServices: build.query({
            query: (params) => ({
                method: "GET",
                url: `/admin/services/`,
                params
            }),
            providesTags: ['SERVICE']
        }),
        getOneServices: build.query({
            query: (id) => ({
                method: "GET",
                url: `/admin/services/${id}`,
            }),
            providesTags: ['SERVICE']
        })
    }),
    overrideExisting: false
});

export const { useGetServicesQuery, useGetOneServicesQuery } = extendedApi;
