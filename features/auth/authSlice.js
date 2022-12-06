import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as authLocalStorage from './authLocalStorage';


const storedAuthState = authLocalStorage.getAuthState();

const initialState = {
    user:{},
    imageProfile: '',
    loggedIn: false,
    loading: false,
    error:false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state,{payload}) => {
      //state.token = payload.token;
      state.user = payload.user; 
      state.loggedIn = true;
      
    },

    userLoggedOut: (state) => {
      state.token = null;
      state.user = null;
      state.loggedIn = false;
    },
    userUpdatedProfilePicture: (state , {payload}) => {
    //   if (state.user) {
    //     state.user = { ...state.user, profilePicture: updatedProfilePicture };
    //   }
    state.imageProfile = payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userUpdatedProfilePicture } = authSlice.actions;

export default authSlice.reducer; 