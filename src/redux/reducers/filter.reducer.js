import { combineReducers } from 'redux';

const searchQueryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        search_query: action.payload
      }
      case 'SET_FILTER':
      return {
        ...state,
        // brackets represent a string of whatever value is passed (i.e. 'min_price')
        [action.payload.property]: action.payload.value
      }
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