import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const donorApi = createApi({
    reducerPath: 'donorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blood-exchange-bd.onrender.com/'
    }),
    tagTypes: ['donor'],
    endpoints: (builder) => ({
        getDonor: builder.query({
            query: () => ({
                method: 'GET',
                url: 'donor',
            }),
            providesTags: ['donor']
        }),
        deleteDonor: builder.mutation({
            query: (id) => ({
                url: `/donor/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['donor']
        })
    })
})

export const { useGetDonorQuery, useDeleteDonorMutation } = donorApi;