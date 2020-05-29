import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* boxSaga() {
  yield takeLatest('FETCH_BOX', fetchBox);

}

// worker Saga: will be fired on "FETCH_BOXES" actions
function* fetchBox() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
  
    const response = yield axios.get('/api/box', config);
    console.log('----> Send this boxes to reducer', response.data)
  
    yield put({ type: 'SET_BOX', payload: response.data });
  } catch (error) {
    console.log('Box get request failed', error);
  }
}




export default boxSaga;
