import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    GET
// ====================================================================================================================================

// Count My Listings
function* fetchMyListingsCount() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const myListingsCount = yield axios.get(`/api/profile/listing-count`, config);  // Get My Listing Count
      yield put({ type: 'SET_MY_LISTINGS_COUNT', payload: myListingsCount.data });    // Set Reducer
  
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

// Count my pending outgoing offers
function* fetchOffersOutCount() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const myOffersOutCount = yield axios.get(`/api/profile/offers-out-count`, config);  // Get Outgoing Offer Count
      yield put({ type: 'SET_MY_OFFER_OUT_COUNT', payload: myOffersOutCount.data });      // Set Reducer
  
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

// Count my pending incoming offers
function* fetchOffersInCount() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const myOffersInCount = yield axios.get(`/api/profile/offers-in-count`, config);  // Get Incoming Offer Count
      yield put({ type: 'SET_MY_OFFER_IN_COUNT', payload: myOffersInCount.data });      // Set Reducer
  
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* profileSaga() {
  yield takeLatest('FETCH_MY_LISTINGS_COUNT', fetchMyListingsCount);
  yield takeLatest('FETCH_OFFERS_OUT_COUNT', fetchOffersOutCount);
  yield takeLatest('FETCH_OFFERS_IN_COUNT', fetchOffersInCount);
}

export default profileSaga;