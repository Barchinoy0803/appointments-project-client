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
        }),
        createBusiness: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/admin/business/",
                body
            }),
            invalidatesTags: ['BUSINESS']
        }),
        deleteBusiness: build.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/admin/business/${id}/`,
            }),
            invalidatesTags: ['BUSINESS']
        }),
        updateBusiness: build.mutation({
            query: ({ id, body }) => ({
                method: "PATCH",
                url: `/admin/business/${id}/`,
                body
            }),
            invalidatesTags: ['BUSINESS']
        })
    }),
    overrideExisting: false
})

export const { useGetBusinessesQuery, useGetOneBusinessesQuery, useCreateBusinessMutation, useUpdateBusinessMutation, useDeleteBusinessMutation } = extendedApi;
