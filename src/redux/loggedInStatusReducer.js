const initialState = false; // Initial state for login status is false (user is not logged in)

const loggedInStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN_STATUS':
      return action.payload;
    default:
      return state;
  }
};

export default loggedInStatusReducer;
