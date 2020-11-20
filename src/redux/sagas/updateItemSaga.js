import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateItemSaga() {
    yield takeLatest('UPDATE_ITEM', updateItem);
  }

function* updateItem(action) {
  try {
    // console.log('---> id for this item:', action.payload.itemId)
        // console.log('---> send this item:', action.payload.item)

    let itemId = action.payload.itemId
    let boxId = action.payload.boxId
    let item = action.payload.item
    // console.log('---> id for this item:',itemId)
    yield axios.put(`/api/item/${itemId}`,action.payload );
    // console.log('---> send this item to server:', item)
    // console.log('---> id for this item:', action.payload.itemId)
    yield put({
      type: 'FETCH_ITEMS',
      payload: {id : boxId}
    });
  } catch (error) {
      console.log('Error with update item:', error);
  }
}

export default updateItemSaga;
