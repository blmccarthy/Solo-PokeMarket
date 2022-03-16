import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_LISTINGS" actions
function* fetchListings() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    console.log('in fetchListings');
    
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const listings = yield axios.get('/api/listings', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_LISTINGS', payload: listings.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}



function* fetchListingImages() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      const images = yield axios.get('/api/listings/images', config);
      
      yield put({ type: 'SET_IMAGES', payload: images.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }



function* listingSaga() {
  yield takeLatest('FETCH_LISTINGS', fetchListings);
  yield takeLatest('FETCH_LISTING_IMAGES', fetchListingImages);
}



export default listingSaga;
