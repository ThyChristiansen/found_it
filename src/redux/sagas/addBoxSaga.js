import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addBoxSaga() {
    yield takeLatest('ADD_BOX', addBox);
    yield takeLatest('ADD_FIRST_BOX', addFirstBox);

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

function* addFirstBox() {
  try {
    yield axios.post('/api/box/firstbox');
    // console.log('--->qr_code for this box:')
    // automatically log a user in after registration
    yield put({ type: 'FETCH_BOX'});
  } catch (error) {
      console.log('Error with add new box:', error);
  }
}



export default addBoxSaga;
