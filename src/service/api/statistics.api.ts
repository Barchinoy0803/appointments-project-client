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
        }),
        getTopClients: build.query({
            query: () => ({
                method: "GET",
                url: "/top-clients/",
            })
        }),
        getTopSpecialists: build.query({
            query: () => ({
                method: "GET",
                url: "/top-specialists"
            })
        })
    }),
    overrideExisting: false
});

export const { useGetTopServicesQuery, useGetAppointmentsByDateQuery, useGetTopClientsQuery, useGetTopSpecialistsQuery } = extendedApi;
