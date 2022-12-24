import { configureStore } from '@reduxjs/toolkit'
import { donorApi } from '../features/api/apiSlice'
import donorReducer from '../features/donor/donorSlice'

export const store = configureStore({
    reducer: {
        [donorApi.reducerPath]: donorApi.reducer,
        donor: donorReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(donorApi.middleware)
})