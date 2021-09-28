import { configureStore } from '@reduxjs/toolkit'
import user from "./AuthSlice"

export const store = configureStore({
    reducer: {
        user
    },
})