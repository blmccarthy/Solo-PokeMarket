import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ====================================================================================================================================
//    GET ALL CONDITIONS
// ====================================================================================================================================

function* fetchConditions() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };

      const conditions = yield axios.get('/api/conditions', config);
      
      yield put({ type: 'SET_CONDITIONS', payload: conditions.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* conditionSaga() {
  yield takeLatest('FETCH_CONDITIONS', fetchConditions);
}

export default conditionSaga;