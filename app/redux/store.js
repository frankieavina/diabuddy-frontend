import { configureStore } from '@reduxjs/toolkit'; 
import userReducer from './slices/UserSlice';
import basalReducer from './slices/BasalTestingSlice';
import  reminderSlice  from './slices/ReminderSlice';
import  bolusSlice  from './slices/FoodLogSlice';
import { userApi } from '../../common/api/userApi';
import { adminApi } from '../../common/api/adminApi';

export const store = configureStore({
  reducer: {
    UserData: userReducer,
    basal: basalReducer,
    reminder: reminderSlice,
    bolus: bolusSlice,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([userApi.middleware, adminApi.middleware])

})