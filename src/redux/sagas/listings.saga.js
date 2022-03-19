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

    const listings = yield axios.get('/api/listings', config);    // Get ALL Listings from Server/Db
    yield put({ type: 'SET_LISTINGS', payload: listings.data });  // Set ALL Listings to reducer

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
    
    const selectedListing = yield axios.get(`/api/listings/selected/${action.payload}`, config); // Get selected Listing
    yield put({ type: 'SET_SELECTED_LISTING', payload: selectedListing.data[0] });               // Set Selected Listing Reducer

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    FETCH SELECTED IMAGE
// ====================================================================================================================================

function* fetchSelectedImage(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    const selectedImage = yield axios.get(`/api/listings/images/${action.payload}`, config);  // Get Selected Image from server/Db
    yield put({ type: 'SET_SELECTED_IMAGE', payload: selectedImage.data[0] });                // Set Reducer

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

    const myListings = yield axios.get('/api/listings/my-listings', config);  // Get ONLY my listings
    yield put({ type: 'SET_MY_LISTINGS', payload: myListings.data });         // Set Reducer

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

    const images = yield axios.get('/api/listings/images', config); // Get ALL images
    yield put({ type: 'SET_IMAGES', payload: images.data });        // Set Reducer

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

    axios.post('/api/listings', action.payload, config);  // Post New Listing to Server/Db
    yield put({ type: 'FETCH_LISTINGS' });                // Re-Gets ALL Listings
    yield put({ type: 'FETCH_MY_LISTINGS' });             // Re-Gets User Listings

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

    axios.put(`/api/listings/${action.payload.id}`, action.payload, config);  // Updates Specified Listing
    yield put({ type: 'FETCH_LISTINGS' });                                    // Re-Gets ALL Listings
    yield put({ type: 'FETCH_MY_LISTINGS' });                                 // Re-Gets User Listings

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    UPDATE SELECTED IMAGE
// ====================================================================================================================================

function* updateImage(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    axios.put(`/api/listings/images/${action.payload.id}`, action.payload, config); // Updates Specified Image
    yield put({ type: 'FETCH_LISTING_IMAGES' });                                    // Re-Gets ALL Listings

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    DELETE SELECTED LISTING
// ====================================================================================================================================

function* deleteListing(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    axios.delete(`/api/listings/${action.payload}`, config);  // Deletes Specified Listing
    yield put({ type: 'FETCH_LISTINGS' });                    // Re-Gets ALL Listings
    yield put({ type: 'FETCH_MY_LISTINGS' });                 // Re-Gets User Listings

  } catch (error) {
    console.log('User get request failed', error);
  }
}

// ====================================================================================================================================
//    SAGA LISTENERS
// ====================================================================================================================================

function* listingSaga() {
  // --- GET ----------------------------------------------------------------
  yield takeLatest('FETCH_LISTINGS', fetchListings);
  yield takeLatest('FETCH_LISTING_IMAGES', fetchListingImages);
  yield takeLatest('FETCH_MY_LISTINGS', fetchMyListings);
  yield takeLatest('FETCH_SELECTED_LISTING', fetchSelectedListing);
  yield takeLatest('FETCH_SELECTED_IMAGES', fetchSelectedImage);
  // --- POST / UPDATE / DELETE ---------------------------------------------
  yield takeLatest('POST_LISTING', postListing);
  yield takeLatest('UPDATE_LISTING', updateListing);
  yield takeLatest('UPDATE_IMAGE', updateImage);
  yield takeLatest('DELETE_LISTING', deleteListing);
}

export default listingSaga;
