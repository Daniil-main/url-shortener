import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { urlApi } from '../../services/api';

export interface UrlResult {
  shortCode: string;
  shareUrl: string;
  statsUrl: string;
}

export interface UrlState {
  loading: boolean;
  error: string | null;
  result: UrlResult | null;
}

export const shortenUrl = createAsyncThunk(
  'url/shorten',
  async (originalUrl: string, { rejectWithValue }) => {
    try {
      const response = await urlApi.shorten(originalUrl);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to shorten URL'
      );
    }
  }
);

const initialState: UrlState = {
  loading: false,
  error: null,
  result: null,
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearResult: (state) => {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearResult } = urlSlice.actions;
export default urlSlice.reducer;