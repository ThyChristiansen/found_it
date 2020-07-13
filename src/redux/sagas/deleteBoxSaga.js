import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteBoxSaga() {
  yield takeLatest('DELETE_BOX', deleteBox);
}

function* deleteBox(action) {
  try {
    let boxId = action.payload.boxId
    let roomId = action.payload.roomId
    yield axios.delete(`/api/box/${boxId}`);
    console.log('--->qr_code for this box:', action.payload.boxId)
    yield put({
      type: 'FETCH_BOX',
      payload: {roomId : roomId}
    });
  } catch (error) {
    console.log('Error with deletebox:', error);
  }
}



export default deleteBoxSaga;
