import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addBoxSaga() {
    yield takeLatest('ADD_BOX', addBox);
  }

function* addBox(action) {
  try {

    yield axios.post('/api/box', action.payload);
    console.log('--->qr_code for thid box:', action.payload)
    // automatically log a user in after registration
    yield put({ type: 'FETCH_BOX'});
    // yield put({ type: 'FETCH_BOX_NAME'});

    yield put({ type: 'SET_QR_CODE', payload: action.payload.qr_code });

  } catch (error) {
      console.log('Error with add new box:', error);
  }
}



export default addBoxSaga;
