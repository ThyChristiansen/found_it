import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addBoxSaga() {
    yield takeLatest('ADD_BOX', addBox);
  }

function* addBox() {
  try {
    yield axios.post('/api/box');
    // console.log('--->qr_code for this box:')
    // automatically log a user in after registration
    yield put({ type: 'FETCH_BOX'});
  } catch (error) {
      console.log('Error with add new box:', error);
  }
}



export default addBoxSaga;
