import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogIn = createAsyncThunk(
  'signIn',
  async ({ email, password }) => {
    try {
      console.log('WE HIT A REQUEST');
      const backendRes = await axios.post(
        'http://localhost:3000/api/users/signin',
        {
          email: email,
          password: password
        }
      );
      return backendRes.data;
    } catch (err) {
      console.error(`Error!: ${err}`);
    }
  }
);

export const userRegister = createAsyncThunk(
  'signUp',
  async ({ email, password, name }) => {
    try {
      const backendRes = await axios.post(
        'http://localhost:3000/api/users/register',
        {
          name: name,
          email: email,
          password: password,
        });
      return backendRes.data;
    } catch (err) {
      alert('Whoops! Something went wrong. Please check email and or password and try again.');
      console.error(`Error!: ${err}`);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {},
    loggedIn: false,
    loading: false,
    error: false
  },
  reducers: {
    // setUser(state, { payload }) {
    //   state.username = payload.username;
    //   state.name = payload.name;
    //   state.loggedIn = false;
    // },
    setLogout(state) {
      state.loggedIn = false;
      state.value = {};
      // remove jwt from storage
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        // state.value = payload.result;
        state.loggedIn = true;
        // if (payload.token) {
        //   localStorage.setItem('user', JSON.stringify(payload.token));
        // }
      })
      .addCase(userLogIn.rejected, (state) => {
        state.error = true;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loggedIn = true; 
        // state.value = payload.reslut;
      })
      .addCase(userRegister.rejected, (state) => {
        state.error = true;
      });
  }
});

export const { setLogout } = userSlice.actions;

export default userSlice.reducer;