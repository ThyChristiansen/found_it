import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* boxSaga() {
  yield takeLatest('FETCH_BOX', fetchBox);
  yield takeLatest('ADD_BOX', addBox);
  yield takeLatest('ADD_FIRST_BOX_IN_ROOM', addFirstBoxInRoom);
  yield takeLatest('UNBOX', updateBoxStatus);

}

// worker Saga: will be fired on "FETCH_BOXES" actions
function* fetchBox(action) {
  let room_id = action.payload.roomId
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get(`/api/box/${room_id}`, config);

    yield put({
      type: 'SET_BOX',
      payload: response.data
    });
  } catch (error) {
    console.log('Box get request failed', error);
  }
}

// worker Saga: will be fired on "ADD_BOX" actions
function* addBox(action) {
  try {
    let roomId = action.payload.roomId
    console.log('--------> in add box', roomId)
    yield axios.post(`/api/box/${roomId}`);
    console.log('---> send room id of this box to server:', roomId)
    // automatically log a user in after registration
    yield put({
      type: 'FETCH_BOX',
      payload: { roomId: roomId }
    });
  } catch (error) {
    console.log('Error with add new box:', error);
  }
}

function* addFirstBoxInRoom(action) {
  try {
    let roomId = action.payload.roomId
    console.log('--------> in add first box', roomId)
    yield axios.post(`/api/box/firstboxInRoom/${roomId}`);
    console.log('---> send room id of this box to server:', roomId)
    yield put({
      type: 'FETCH_BOX',
      payload: { roomId: roomId }
    });
  } catch (error) {
    console.log('Error with add first box:', error);
  }
}

// worker Saga: will be fired on "UPDATE_BOX_STATUS" actions
function* updateBoxStatus(action) {
  try {
    let boxId = action.payload.boxId
    let roomId = action.payload.roomId

    console.log('---> from update box status,send this box id:', boxId)
    yield axios.put(`/api/box/${boxId}`);
    console.log('---> send this item to server:', boxId)
    yield put({
      type: 'FETCH_BOX',
      payload: { roomId: roomId }
    });
  } catch (error) {
      console.log('Error with update box:', error);
  }
}

export default boxSaga;
