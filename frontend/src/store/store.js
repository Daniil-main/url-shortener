import { configureStore } from '@reduxjs/toolkit'
import urlReducer from './slices/urlSlice.js'

export const store = configureStore({
  reducer: {
    url: urlReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})