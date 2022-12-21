import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const donorApi = createApi({
    reducerPath: 'donorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blood-exchange-bd.onrender.com/'
    }),
    endpoints: (builder) => ({
        getDonor: builder.query({
            query: () => ({
                method: 'GET',
                url: 'donor'
            })
        })
    })
})

export const { useGetDonorQuery } = donorApi;