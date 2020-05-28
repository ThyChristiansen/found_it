import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addItemSaga() {
  yield takeLatest('ADD_ITEM', addItem);
}


function* addItem(action) {
  try {
    let boxId = action.payload.id
    console.log('add this item', action.payload);
    yield axios.post(`/api/item/${boxId}`, action.payload);
    console.log('send this item to server', action.payload);
    yield put({
      type: 'FETCH_ITEMS',
      payload: {id : boxId}
    });

  } catch (error) {
    console.log('Error with add new item:', error);
  }
}

export default addItemSaga;
