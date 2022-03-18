import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    FETCH ALL LISTINGS
// ====================================================================================================================================

function* fetchListings() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const listings = yield axios.get('/api/listings', config);
    yield put({ type: 'SET_LISTINGS', payload: listings.data });

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    FETCH SELECTED LISTING
// ====================================================================================================================================

function* fetchSelectedListing(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    const selectedListing = yield axios.get(`/api/listings/selected/${action.payload}`, config);
    yield put({ type: 'SET_SELECTED_LISTING', payload: selectedListing.data[0] });

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    FETCH ONLY MY LISTINGS
// ====================================================================================================================================

function* fetchMyListings() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const myListings = yield axios.get('/api/listings/my-listings', config);
    yield put({ type: 'SET_MY_LISTINGS', payload: myListings.data });

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    FETCH ALL LISTING IMAGES
// ====================================================================================================================================

function* fetchListingImages() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const images = yield axios.get('/api/listings/images', config);
    yield console.log('in fetchListingImages');
    yield put({ type: 'SET_IMAGES', payload: images.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    POST NEW LISTING
// ====================================================================================================================================

function* postListing(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    axios.post('/api/listings', action.payload, config);

    yield put({ type: 'FETCH_LISTINGS' });
    yield put({ type: 'FETCH_MY_LISTINGS' });

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    UPDATE LISTING
// ====================================================================================================================================

function* updateListing(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    axios.put(`/api/listings/${action.payload.id}`, action.payload, config);

    yield put({ type: 'FETCH_LISTINGS' });
    yield put({ type: 'FETCH_MY_LISTINGS' });

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    DELETE LISTING
// ====================================================================================================================================

function* deleteListing(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    axios.delete(`/api/listings/${action.payload}`, config);

    yield put({ type: 'FETCH_LISTINGS' });
    yield put({ type: 'FETCH_MY_LISTINGS' });

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    SAGA LISTENERS
// ====================================================================================================================================

function* listingSaga() {
  yield takeLatest('FETCH_LISTINGS', fetchListings);
  yield takeLatest('FETCH_SELECTED_LISTING', fetchSelectedListing);
  yield takeLatest('FETCH_MY_LISTINGS', fetchMyListings);
  yield takeLatest('FETCH_LISTING_IMAGES', fetchListingImages);
  yield takeLatest('POST_LISTING', postListing);
  yield takeLatest('UPDATE_LISTING', updateListing);
  yield takeLatest('DELETE_LISTING', deleteListing);
}

export default listingSaga;
