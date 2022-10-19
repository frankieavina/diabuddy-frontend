import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addReminder = createAsyncThunk(
  'addReminder',
  async ({ name,dateTime }) => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          name,
          dateTime
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

export const deleteReminder = createAsyncThunk(
  'deleteReminder',
  async ({ id }) => {
    try {
      const res = await axios.delete(
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

export const getReminders = createAsyncThunk(
    'getReminders',
    async ({ id }) => {
      try {
        const res = await axios.get(
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

export const reminderSlice = createSlice({
  name:'reminder',
  initialState: {
    value: {},
    loading: false,
    error: false
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(addReminder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReminder.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(addReminder.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteReminder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReminder.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteReminder.rejected, (state) => {
        state.error = true;
      })
      .addCase(getReminders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReminders.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getReminders.rejected, (state) => {
        state.error = true;
      })
  }
});

export const { } = reminderSlice.actions;

export default reminderSlice.reducer;