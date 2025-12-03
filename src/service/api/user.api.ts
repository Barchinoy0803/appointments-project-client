import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                method: "GET",
                url: `/admin/users`,
                params
            }),
            providesTags: ['USER']
        }),
        getOneUser: build.query({
            query: (id) => ({
                method: "GET",
                url: `/admin/users/${id}/`
            })
        }),
        createUser: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/admin/users/",
                body
            }),
            invalidatesTags: ['USER']
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/admin/users/${id}/`,
            }),
            invalidatesTags: ['USER']
        }),
        updateUser: build.mutation({
            query: ({ id, body }) => ({
                method: "PATCH",
                url: `/admin/users/${id}/`,
                body
            }),
            invalidatesTags: ['USER']
        }),
    }),
    overrideExisting: false
});

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation, useGetOneUserQuery } = extendedApi;
