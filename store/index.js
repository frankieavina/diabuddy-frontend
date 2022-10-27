import { configureStore } from '@reduxjs/toolkit'; 
import userReducer from './UserSlice';
import basalReducer from './BasalTestingSlice';
import  reminderSlice  from './ReminderSlice';
import  bolusSlice  from './FoodLogSlice';

export default configureStore({
  reducer: {
    UserData: userReducer,
    basal: basalReducer,
    reminder: reminderSlice,
    bolus: bolusSlice
  },
});