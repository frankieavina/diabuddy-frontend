import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addBasalTest = createAsyncThunk(
  'addTest',
  async ({ numTest, glucose,date }) => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          numTest: numTest,
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

export const deleteBasalTest = createAsyncThunk(
  'deleteTest',
  async ({ id }) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/signup',
        {
            headers: {Authorization: `Bearer ${jwt}`}
        });
      return res.data;
    } catch (err) {
      alert('Whoops! Something went wrong.');
      console.error(`Error!: ${err}`);
    }
  }
);

export const basalSlice = createSlice({
  name: 'user',
  initialState: {
    value: {},
    loggedIn: false,
    loading: false,
    error: false
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(addBasalTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBasalTest.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(addBasalTest.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteBasalTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBasalTest.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteBasalTest.rejected, (state) => {
        state.error = true;
      })
  }
});

export const { } = basalSlice.actions;

export default basalSlice.reducer;