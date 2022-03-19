import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    GET ALL GRADING SERVICES
// ====================================================================================================================================

function* fetchGradingServices() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      const gradingServices = yield axios.get('/api/grading-services', config);
      
      yield put({ type: 'SET_GRADING_SERVICES', payload: gradingServices.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* gradingServiceSaga() {
  yield takeLatest('FETCH_CONDITIONS', fetchGradingServices);
}

export default gradingServiceSaga;