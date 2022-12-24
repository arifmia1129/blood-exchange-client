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
        getSingleDonor: builder.query({
            query: (id) => ({
                method: 'GET',
                url: `donor/${id}`,
            })
        }),
        deleteDonor: builder.mutation({
            query: (id) => ({
                url: `/donor/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['donor']
        }),
        addDonor: builder.mutation({
            query: (donor) => ({
                url: `/donor`,
                method: 'POST',
                body: donor
            }),
            invalidatesTags: ['donor']
        }),
        updateDonor: builder.mutation({
            query: ({ id, donor }) => ({
                url: `/donor/${id}`,
                method: 'PUT',
                body: donor
            }),
            invalidatesTags: ['donor']
        }),
    })
})

export const { useGetDonorQuery, useDeleteDonorMutation, useAddDonorMutation, useGetSingleDonorQuery, useUpdateDonorMutation } = donorApi;