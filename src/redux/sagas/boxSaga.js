import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* boxSaga() {
  yield takeLatest('FETCH_BOX', fetchBox);
  yield takeLatest('ADD_BOX', addBox);
  yield takeLatest('ADD_FIRST_BOX', addFirstBox);

}

// worker Saga: will be fired on "FETCH_BOXES" actions
function* fetchBox(action) {
  let room_id = action.payload.roomId
  console.log('----> room id:', room_id)
  console.log('----> send this box to server id:', room_id)
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get(`/api/box/${room_id}`, config);
    console.log('----> Send this boxes to reducer', response.data)

    yield put({
      type: 'SET_BOX',
      payload: response.data
    });
  } catch (error) {
    console.log('Box get request failed', error);
  }
}

function* addBox(action) {
try {
  let roomId = action.payload.roomId
  console.log('--------> in add box',roomId)
  yield axios.post(`/api/box/${roomId}`);
  console.log('---> send room id of this box to server:',roomId)
  // automatically log a user in after registration
  yield put({
    type: 'FETCH_BOX',
    payload: {roomId : roomId}
  });  } catch (error) {
    console.log('Error with add new box:', error);
}
}

function* addFirstBox(action) {
try {
  let roomId = action.payload.roomId
  console.log('--------> in add first box',roomId)
  yield axios.post(`/api/box/firstbox/${roomId}`);
  console.log('---> send room id of this box to server:',roomId)
  yield put({
    type: 'FETCH_BOX',
    payload: {roomId : roomId}
  });
} catch (error) {
    console.log('Error with add new box:', error);
}
}


export default boxSaga;
