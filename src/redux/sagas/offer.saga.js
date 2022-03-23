import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    GET: INCOMING OFFERS
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
//    GET: OUTGOING OFFERS
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
//    POST: CURRENT OFFER
// ====================================================================================================================================

function* postOffer(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      axios.post('/api/offers', action.payload, config);  // Post offer
      
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

// ====================================================================================================================================
//    UPDATE: ACCEPT OFFER
// ====================================================================================================================================

function* UpdateAcceptOffer(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      axios.put(`/api/offers/${action.payload}`, config);
      yield put({ type: 'FETCH_INCOMING_OFFERS' })        // Gets updated Incoming offers
      
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

// ====================================================================================================================================
//    DELETE: DECLINE OFFER
// ====================================================================================================================================

function* UpdateDeclineOffer(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      axios.delete(`/api/offers/${action.payload}`, config);
      yield put({ type: 'FETCH_INCOMING_OFFERS' })        // Gets updated Incoming offers
      
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* offerSaga() {
  yield takeLatest('POST_OFFER', postOffer);
  yield takeLatest('FETCH_INCOMING_OFFERS', fetchMyIncomingOffers);
  yield takeLatest('FETCH_OUTGOING_OFFERS', fetchMyOutgoingOffers);
  yield takeLatest('UPDATE_ACCEPT_OFFER', UpdateAcceptOffer);
  yield takeLatest('UPDATE_DECLINE_OFFER', UpdateDeclineOffer);
}

export default offerSaga;