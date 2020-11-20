import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* roomNameSaga() {
  yield takeLatest('FETCH_ROOM_NAME', getRoomName);

}

// worker Saga: will be fired on "FETCH_BOXES" actions
function* getRoomName(action) {
  let room_id = action.payload.roomId
  // console.log('----> from get room name send this id to server id:', room_id)
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get(`/api/roomName/${room_id}`, config);
    // console.log('----> from get room name send this name to reducer', response.data)

    yield put({
      type: 'SET_ROOM_NAME',
      payload: response.data
    });
  } catch (error) {
    console.log('Box get request failed', error);
  }
}

export default roomNameSaga;
