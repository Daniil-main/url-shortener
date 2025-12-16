import { configureStore } from '@reduxjs/toolkit'
import urlReducer from './slices/urlSlice'
import statsReducer from './slices/statsSlice'

export const store = configureStore({
  reducer: {
    url: urlReducer,
    stats: statsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch