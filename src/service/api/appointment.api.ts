import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAppointments: build.query({
            query: (params) => ({
                method: "GET",
                url: `/admin/appointments/`,
                params
            }),
            providesTags: ['APPOINTMENT']
        })
    }),
    overrideExisting: false
})

export const { useGetAppointmentsQuery } = extendedApi;
