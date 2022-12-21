import { configureStore } from '@reduxjs/toolkit'
import { donorApi } from '../features/api/apiSlice'

export const store = configureStore({
    reducer: {
        [donorApi.reducerPath]: donorApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(donorApi.middleware)
})