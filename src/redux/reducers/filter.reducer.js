import { combineReducers } from 'redux';

const searchQueryReducer = (state = [], action) => {
  switch (action.type) {
      case 'SET_FILTER':
      return {
        ...state,
        // brackets represent a string of whatever value is passed (i.e. 'min_price')
        [action.payload.property]: action.payload.value
      }
    default:
      return {
        search_query: '',
        set: '',
        search_NM: false,
        search_LP: false,
        search_MP: false,
        search_HP: false,
        search_DMG: false,
        min_price: '',
        max_price: '',
      }
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