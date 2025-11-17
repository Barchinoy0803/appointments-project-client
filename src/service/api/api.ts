import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { validateToken } from '../../helpers';
import { RootState } from '../../redux';
import { logout } from '../../redux/features/user.slice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).userSlice.token
        if (validateToken(token)) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithStatusHandling: typeof baseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 || result?.error?.status === 403) {
        api.dispatch(logout())
        window.location.href = 'login';
    }

    return result;
};

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: baseQueryWithStatusHandling,
    tagTypes: ['USER', 'APPOINTMENT', 'SERVICE', 'BUSINESS'],
    endpoints: () => ({}),
    refetchOnMountOrArgChange: true,
});
