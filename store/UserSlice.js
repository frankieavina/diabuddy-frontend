import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userLogIn = createAsyncThunk(
  'signIn',
  async ({ email, password }) => {
    try {
      const backendRes = await axios.post(
        'https://diabuddy-mysql-backend-production.up.railway.app//api/auth/signin',
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
        'https://diabuddy-mysql-backend-production.up.railway.app//api/auth/signup',
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
    imageProfile: '',
    loggedIn: false,
    loading: false,
    error: false
  },
  reducers: {
    userLoggedIn(state, { payload }) {
      state.loggedIn = true;
    },
    setLogout(state) {
      state.loggedIn = false;
      state.value = {};
      AsyncStorage.clear();
    },
    setProfileImage(state,{payload}){
      state.imageProfile = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userLogIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogIn.fulfilled, (state, { payload }) => {
        if(payload.success){
          state.loading = false;
          state.value = payload.result;
          state.loggedIn = true;
          if (payload.token) {
            AsyncStorage.setItem('token', JSON.stringify(payload.token));
            AsyncStorage.setItem('user', payload.result.name);
            AsyncStorage.setItem('id', JSON.stringify(payload.result.id));
            AsyncStorage.setItem('role', JSON.stringify(payload.result.roleId));
          }
        } else {
          Alert.alert(
            'Authentication failed!',
            'Could not log you in. Please check your credentials or try again later!'
          );
        }

      })
      .addCase(userLogIn.rejected, (state) => {
        state.error = true;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        if(payload.success){
          state.loading = false;
          state.value = payload.result;
          state.loggedIn = true;
          if (payload.token) {
            AsyncStorage.setItem('token', JSON.stringify(payload.token));
            AsyncStorage.setItem('user', payload.result.name);
          }
        } else {
          Alert.alert(
            'Authentication failed!',
            'Could not log you in. Please check your credentials or try again later!'
          );
        }
      })
      .addCase(userRegister.rejected, (state) => {
        state.error = true;
      });
  }
});

export const { setLogout, userLoggedIn, setProfileImage} = userSlice.actions;

export default userSlice.reducer;