import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IGetGlucoseByUserResponse, GetGlucoseParams } from '../../types/glucose';
import { glucoseService } from '../../services/glucoseService';

interface GlucoseState {
  data: IGetGlucoseByUserResponse | null;
  isLoading: boolean;
  error: string | null;
  selectedTimeRange: '6h' | '12h' | '24h';
  selectedPoint: {
    value: number;
    time: string;
    index: number;
  } | null;
}

// ESTADO INICIAL
const initialState: GlucoseState = {
  data: null,
  isLoading: false,
  error: null,
  selectedTimeRange: '6h',
  selectedPoint: null,
};

//  ASYNC THUNK PARA OBTENER DATOS DE GLUCOSA
export const fetchGlucoseData = createAsyncThunk(
  'glucose/fetchData',
  async (params: GetGlucoseParams, { rejectWithValue }) => {
    try {
      const response = await glucoseService.getGlucoseByUserAndDateRange(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al obtener datos de glucosa');
    }
  }
);

const glucoseSlice = createSlice({
  name: 'glucose',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<'6h' | '12h' | '24h'>) => {
      state.selectedTimeRange = action.payload;
    },
    setSelectedPoint: (state, action: PayloadAction<{ value: number; time: string; index: number } | null>) => {
      state.selectedPoint = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlucoseData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGlucoseData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGlucoseData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTimeRange, setSelectedPoint, clearError } = glucoseSlice.actions;
export default glucoseSlice.reducer;
