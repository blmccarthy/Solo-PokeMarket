
import { combineReducers } from 'redux';

const myListingCountReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MY_LISTINGS_COUNT':
        return action.payload;
      default:
        return state;
    }
  };

  export default combineReducers({
    myListingCountReducer,
  });