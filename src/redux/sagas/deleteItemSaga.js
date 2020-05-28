import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteItemSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem);
  }

function* deleteItem(action) {
  try {
    yield axios.delete(`/api/item/${action.payload}`, );
    console.log('---> id for this box:', action.payload)
    // automatically log a user in after registration
    yield put({ type: 'FETCH_ITEM'});

  } catch (error) {
      console.log('Error with delete item:', error);
  }
}



export default deleteItemSaga;
