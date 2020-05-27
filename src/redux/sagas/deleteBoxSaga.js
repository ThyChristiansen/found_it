import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteBoxSaga() {
    yield takeLatest('DELETE_BOX', deleteBox);
  }

function* deleteBox(action) {
  try {
    yield axios.delete(`/api/box/${action.payload}`, );
    console.log('--->qr_code for thid box:', action.payload)
    // automatically log a user in after registration
    yield put({ type: 'FETCH_BOX'});

  } catch (error) {
      console.log('Error with deletebox:', error);
  }
}



export default deleteBoxSaga;
