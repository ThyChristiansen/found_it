import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addBoxSaga() {
    yield takeLatest('ADD_BOX', addBox);
    yield takeLatest('ADD_ITEM', addItem);

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

function* addItem(action) {
  try {
    let boxId=  action.payload.id
    console.log('----> add this item', action.payload);
    yield axios.post(`/api/item/${boxId}`, action.payload);
    console.log('----> send this item to server', action.payload);
    // yield put({ type: 'FETCH_BOX'});
  } catch (error) {
      console.log('Error with add new item:', error);
  }
}




export default addBoxSaga;
