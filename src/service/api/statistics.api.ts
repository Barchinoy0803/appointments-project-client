import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getTopServices: build.query({
            query: () => ({
                method: "GET",
                url: `/top-services`,
            }),
        }),
        getAppointmentsByDate: build.query({
            query: (params) => ({
                method: "GET",
                url: "/statistics/",
                params
            })
        })
    }),
    overrideExisting: false
})

export const { useGetTopServicesQuery, useGetAppointmentsByDateQuery } = extendedApi;
