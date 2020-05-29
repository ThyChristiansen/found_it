import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* roomSaga() {
  yield takeLatest('FETCH_ROOM', fetchRoom);

}

// worker Saga: will be fired on "FETCH_BOXES" actions
function* fetchRoom() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/room', config);
    console.log('----> Send this rooms to reducer', response.data)

    yield put({ type: 'SET_ROOM', payload: response.data });
  } catch (error) {
    console.log('Box get request failed', error);
  }
}

export default roomSaga;
