import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    FETCH MY LISTING COUNT
// ====================================================================================================================================

function* fetchMyListingsCount() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const myListingsCount = yield axios.get(`/api/profile/listing-count`, config);    // Get My Listing Count
      yield put({ type: 'SET_MY_LISTINGS_COUNT', payload: myListingsCount.data[0] });   // Set Reducer
  
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* profileSaga() {
  yield takeLatest('FETCH_MY_LISTINGS_COUNT', fetchMyListingsCount);
}

export default profileSaga;