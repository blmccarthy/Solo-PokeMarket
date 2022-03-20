import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    POST CURRENT OFFER
// ====================================================================================================================================

function* postOffer(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      axios.post('/api/offers', action.payload, config);
      
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* offerSaga() {
  yield takeLatest('POST_OFFER', postOffer);
}

export default offerSaga;