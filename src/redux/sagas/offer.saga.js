import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    GET INCOMING OFFERS
// ====================================================================================================================================

function* fetchMyIncomingOffers() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const incomingOffers = yield axios.get('/api/offers/incoming', config);
    yield put({ type: 'SET_INCOMING_OFFERS', payload: incomingOffers.data });
    
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    GET OUTGOING OFFERS
// ====================================================================================================================================

function* fetchMyOutgoingOffers() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const outgoingOffers = yield axios.get(`/api/offers/outgoing`, config);
    yield put({ type: 'SET_OUTGOING_OFFERS', payload: outgoingOffers.data });
    
  } catch (error) {
    console.log('User get request failed', error);
  }
}


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
  yield takeLatest('FETCH_INCOMING_OFFERS', fetchMyIncomingOffers);
  yield takeLatest('FETCH_OUTGOING_OFFERS', fetchMyOutgoingOffers);
}

export default offerSaga;