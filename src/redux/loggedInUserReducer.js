// userTypeReducer.js
const initialState = null; // or whatever your initial state should be

const loggedInUserReducer = (state = initialState, action) => {
    console.log(action);
  switch (action.type) {
    case 'SET_USER_ID':
      return action.payload;
    default:
      return state;
  }
};

export default loggedInUserReducer;
