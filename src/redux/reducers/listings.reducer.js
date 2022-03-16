import { combineReducers } from 'redux';

const listingReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LISTINGS':
        return action.payload;
      default:
        return state;
    }
  };

const myListingReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MY_LISTINGS':
        return action.payload;
      default:
        return state;
    }
  };

  const imageReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_IMAGES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default combineReducers({
    listingReducer,
    myListingReducer,
    imageReducer,
  });
  