// userTypeReducer.js
const initialState = null; // or whatever your initial state should be

const userTypeReducer = (state = initialState, action) => {
    console.log(action);
  switch (action.type) {
    case 'SET_USER_TYPE':
      return action.payload;
    default:
      return state;
  }
};

export default userTypeReducer;
