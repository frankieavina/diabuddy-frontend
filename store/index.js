import { configureStore } from '@reduxjs/toolkit'; 
import userReducer from './UserSlice';
import basalReducer from './BasalTestingSlice';

export default configureStore({
  reducer: {
    UserData: userReducer,
    basal: basalReducer,
  },
});