import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addBasalTest = createAsyncThunk(
  'addTest',
  async ({ numTest, glucose,date, userId }) => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/basal/add-test',
        {
          numTest,
          glucose,
          time: date,
          userId
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

export const getBasalTest = createAsyncThunk(
  'getTest',
  async ( id ) => {
    id = Math.floor(id); 
    try {
      const jwt = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/basal/get-test',
        {
          userId: id
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
  async ( testId ) => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/basal/delete-test',
        {
          testId
        },
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
  name: 'basal',
  initialState: {
    value: {},
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
      .addCase(getBasalTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBasalTest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.value = payload.result.tests;
      })
      .addCase(getBasalTest.rejected, (state) => {
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