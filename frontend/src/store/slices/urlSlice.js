import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../services/api.js'

export const shortenUrl = createAsyncThunk(
  'url/shorten',
  async (originalUrl, { rejectWithValue }) => {
    try {
      const response = await urlApi.shorten(originalUrl)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to shorten URL'
      )
    }
  }
)

export const getStats = createAsyncThunk(
  'url/getStats',
  async (code, { rejectWithValue }) => {
    try {
      const response = await urlApi.getStats(code)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to load stats'
      )
    }
  }
)

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    loading: false,
    error: null,
    result: null,
    stats: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearResult: (state) => {
      state.result = null
      state.stats = null
    },
    clearStats: (state) => {
      state.stats = null
    }
  },
  extraReducers: (builder) => {
    builder
      // shortenUrl
      .addCase(shortenUrl.pending, (state) => {
        state.loading = true
        state.error = null
        state.result = null
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.loading = false
        state.result = action.payload
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // getStats
      .addCase(getStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearResult, clearStats } = urlSlice.actions
export default urlSlice.reducer