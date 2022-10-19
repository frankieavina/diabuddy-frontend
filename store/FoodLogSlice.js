import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addBolus = createAsyncThunk(
  'addBolus',
  async ({ glucose, carbs, bolus, date }) => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          bolus: bolus,
          carbs: carbs,
          glucose: glucose,
          date: date
        },
        {
          header: {Authorization: `Bearer ${jwt}`}
        }
      );
      return res.data;
    } catch (err) {
      console.error(`Error!: ${err}`);
    }
  }
);

export const bolusSlice = createSlice({
  name:'bolus',
  initialState: {
    value: {},
    loading: false,
    error: false
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(addBolus.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBolus.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(addBolus.rejected, (state) => {
        state.error = true;
      })
  }
});

export const { } = bolusSlice.actions;

export default bolusSlice.reducer;