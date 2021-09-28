import { configureStore } from '@reduxjs/toolkit'
import User from "./AuthSlice"

export const store = configureStore({
    reducer: {
        User
    },
})