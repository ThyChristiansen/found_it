import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteBoxSaga() {
  yield takeLatest('DELETE_BOX', deleteBox);
}

function* deleteBox(action) {
  try {
    let roomId = action.payload.roomId
    console.log('--->qr_code for thid box:', action.payload.boxId)
    yield axios.delete(`/api/box/${action.payload.boxId}`);
    console.log('--->qr_code for thid box:', action.payload)
    yield put({
      type: 'FETCH_BOX',
      payload: {id : roomId}
    });

  } catch (error) {
    console.log('Error with deletebox:', error);
  }
}



export default deleteBoxSaga;
