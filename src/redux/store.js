// store.js
import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from './UserTypeReducer';

const store = configureStore({
  reducer: {
    userType: userTypeReducer,
    // Add other reducers here if you have them
  },
  // Add middleware, enhancers, and other configurations if needed
});

export default store;
