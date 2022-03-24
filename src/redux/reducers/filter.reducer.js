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
        card_name: '',
        set: '',
        search_NM: true,
        search_LP: true,
        search_MP: true,
        search_HP: true,
        search_DMG: true,
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