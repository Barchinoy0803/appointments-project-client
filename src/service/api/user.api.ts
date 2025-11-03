import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                method: "GET",
                url: "/admin/users",
                params
            }),
            providesTags: ['USER']
        }),
        createUser: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/admin/users/",
                body
            }),
            invalidatesTags: ['USER']
        }),
    }),
    overrideExisting: false
})

export const { useGetUsersQuery, useCreateUserMutation } = extendedApi;
