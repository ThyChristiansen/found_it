import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteItemSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem);
  }

function* deleteItem(action) {
  try {
    // console.log('---> id for this item:', action.payload.itemId)
    let boxId = action.payload.boxId
    // console.log('---> id for this box:',boxId)
    yield axios.delete(`/api/item/${action.payload.itemId}`, );
    // console.log('---> id for this item:', action.payload.itemId)
    // automatically log a user in after registration
    yield put({
      type: 'FETCH_ITEMS',
      payload: {id : boxId}
    });
  } catch (error) {
      console.log('Error with delete item:', error);
  }
}

export default deleteItemSaga;
