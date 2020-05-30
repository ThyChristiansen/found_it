import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* roomSaga() {
  yield takeLatest('FETCH_ROOM', fetchRoom);
  yield takeLatest('CREATE_ROOM_LIST', createRoom);


}

// worker Saga: will be fired on "FETCH_BOXES" actions
function* fetchRoom(action) {
  try {
    let userId = action.payload.userId
    console.log('user id', userId)
    const response = yield axios.get(`/api/room/${userId}`);
    console.log('----> Send this rooms to reducer', response.data)

    yield put({ type: 'SET_ROOM', payload: response.data });
  } catch (error) {
    console.log('Box get request failed', error);
  }
}

function* createRoom(action) {
  try {
    let userId = action.payload.userId
    console.log('----------->from createRoom', userId);
    yield axios.post('/api/room', action.payload);
    console.log('send this id of user to server', action.payload);
    yield put({
      type: 'FETCH_ROOM',
      payload: {userId : userId}
    });

  } catch (error) {
    console.log('Error with add new item:', error);
  }
}

export default roomSaga;
