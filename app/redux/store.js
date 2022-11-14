import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; 
import { userApi } from '../../common/api/userApi';
//import userReducer from './UserSlice';
// import basalReducer from './BasalTestingSlice';
// import  reminderSlice  from './ReminderSlice';
// import  bolusSlice  from './FoodLogSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    // basal: basalReducer,
    // reminder: reminderSlice,
    // bolus: bolusSlice
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userApi.middleware),
})

