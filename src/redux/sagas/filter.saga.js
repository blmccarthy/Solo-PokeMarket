import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    SEARCH FOR LISTINGS
// ====================================================================================================================================

function* fetchSearch(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      const searchResults = yield axios.get(`/api/filter/${action.payload}`, config);
      yield put({ type: 'SET_SEARCH_RESULTS', payload: searchResults.data});
      
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* filterSaga() {
  yield takeLatest('FETCH_SEARCH', fetchSearch);
}

export default filterSaga;