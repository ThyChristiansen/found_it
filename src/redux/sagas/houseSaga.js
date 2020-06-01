import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* roomSaga() {
  yield takeLatest('CREATE_HOUSE_NAME', createHouseName);
  yield takeLatest('FETCH_HOUSE_NAME', fetchHouseName);
}

function* fetchHouseName(action) {
  try {
    let userId = action.payload.userId
    console.log('user id', userId)
    const response = yield axios.get(`/api/house/${userId}`);
    console.log('----> Send this house name to reducer', response.data)

    yield put({ type: 'SET_HOUSE_NAME', payload: response.data });
  } catch (error) {
    console.log('House name get request failed', error);
  }
}

function* createHouseName(action) {
  try {
    let userId = action.payload.userId
    console.log('----------->from createHouseName', userId);
    yield axios.post('/api/house', action.payload);
    console.log('send this id of user and room name to server', action.payload);
    yield put({
      type: 'FETCH_ROOM',
      payload: {userId : userId}
    });

  } catch (error) {
    console.log('Error with add new item:', error);
  }
}



export default roomSaga;
