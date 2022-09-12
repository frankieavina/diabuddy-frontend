import { configureStore } from '@reduxjs/toolkit';
// import reducer 
import userReducer from './UserSlice';

// This creates a Redux store, and also automatically configure the Redux
// DevTools extension so that you can inspect the store while developing.
// By defining a field inside the reducer parameter, we tell the store to use
// this slice reducer function to handle all updates to that state.
export default configureStore({
  reducer: {
    UserData: userReducer,
    // userData: userReducer
  },
});