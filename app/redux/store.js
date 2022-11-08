import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; 
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from '../../common/api/userAPI';
//import userReducer from './UserSlice';
// import basalReducer from './BasalTestingSlice';
// import  reminderSlice  from './ReminderSlice';
// import  bolusSlice  from './FoodLogSlice';

export default configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    // basal: basalReducer,
    // reminder: reminderSlice,
    // bolus: bolusSlice
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)