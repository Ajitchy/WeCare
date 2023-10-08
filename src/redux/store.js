// store.js
import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from './UserTypeReducer';
import loggedInStatusReducer from './loggedInStatusReducer';
import loggedInUserReducer from './loggedInUserReducer';

const store = configureStore({
  reducer: {
    userType: userTypeReducer,
    userId: loggedInUserReducer, // Added loggedInUserReducer to store
    isLoggedIn: loggedInStatusReducer, // Added loggedInStatusReducer to store
    // Add other reducers here if you have them
  },
  // Add middleware, enhancers, and other configurations if needed
});

export default store;
