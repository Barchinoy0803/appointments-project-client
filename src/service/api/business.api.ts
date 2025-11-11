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
        })
    }),
    overrideExisting: false
})

export const { useGetBusinessesQuery } = extendedApi;
