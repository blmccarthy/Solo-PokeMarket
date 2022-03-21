
import { combineReducers } from 'redux';

const profileCountReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MY_LISTINGS_COUNT':
        return {
          ...state,
          listing_count: action.payload
        }
      case 'SET_MY_OFFER_OUT_COUNT':
        return {
          ...state,
          offer_out_count: action.payload
        }
      case 'SET_MY_OFFER_IN_COUNT':
        return {
          ...state,
          offer_in_count: action.payload
        }
      default:
        return state;
    }
  };

  export default combineReducers({
    profileCountReducer,
  });