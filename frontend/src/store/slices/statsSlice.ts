import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { urlApi } from '../../services/api';

export interface StatsData {
  url: {
    original: string;
    short: string;
    createdAt: string;
    clicks: number;
  };
  analytics: {
    totalClicks: number;
    clicks: Array<{
      id: string;
      timestamp: string;
      ip: string;
      region: string;
      country: string;
      browser: string;
      os: string;
    }>;
  };
}

export interface StatsState {
  loading: boolean;
  error: string | null;
  stats: StatsData | null;
}

export const getStats = createAsyncThunk(
  'stats/getStats',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await urlApi.getStats(code);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to load stats'
      );
    }
  }
);

const initialState: StatsState = {
  loading: false,
  error: null,
  stats: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearStats: (state) => {
      state.stats = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStats } = statsSlice.actions;
export default statsSlice.reducer;