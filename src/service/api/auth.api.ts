import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                method: "POST",
                url: '/token/',
                body
            }),
        }),
        getMe: build.query({
            query: () => ({
                method: "GET",
                url: '/get-me'
            })
        })
    }),
    overrideExisting: false
})

export const { useGetMeQuery, useLoginMutation } = extendedApi;
