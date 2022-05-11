import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    SEARCH FOR LISTINGS
// ====================================================================================================================================

function* fetchSearch(action) {
  try {

    console.log('action.payload.card_name', action.payload.card_name);

    const searchResults = yield axios.get(`/api/filter/${action.payload.card_name}`); 
    console.log('searchResults', searchResults);
       

    yield put({ type: 'SET_SEARCH_RESULTS', payload: searchResults.data });  // Specified Reducer
    yield put({ type: 'SET_LISTINGS', payload: searchResults.data });        // Home Reducer
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchFilteredSearch(action) {

  try {
    const searchResults = yield axios.post(`/api/filter`, action.payload);
    yield console.log('response.data', searchResults.data);

    yield put({ type: 'SET_SEARCH_RESULTS', payload: searchResults.data }); // Specified Reducer
    yield put({ type: 'SET_LISTINGS', payload: searchResults.data });       // Home Reducer

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* filterSaga() {
  yield takeLatest('FETCH_SEARCH', fetchSearch);
  yield takeLatest('FETCH_FILTERED_SEARCH', fetchFilteredSearch);
}

export default filterSaga;