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

const selectedListingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_LISTING':
      return action.payload;
    case 'CHANGE_SELECTED_LISTING':
      return {
        ...state,
        // brackets represent a string of whatever value is passed (i.e. 'card_name')
        [action.payload.property]: action.payload.value
      }
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

const selectedImageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_IMAGE':
      return action.payload;
    case 'CHANGE_SELECTED_IMAGE':
      return {
        ...state,
        // brackets represent a string of whatever value is passed (i.e. 'card_name')
        [action.payload.property]: action.payload.value
      }
    default:
      return state;
  }
};

export default combineReducers({
  listingReducer,
  selectedListingReducer,
  myListingReducer,
  imageReducer,
  selectedImageReducer,
});
