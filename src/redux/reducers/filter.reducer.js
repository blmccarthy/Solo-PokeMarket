import { combineReducers } from 'redux';

const searchQueryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return action.payload;
    default:
      return state;
  }
};

const searchResultsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  searchQueryReducer,
  searchResultsReducer,
});